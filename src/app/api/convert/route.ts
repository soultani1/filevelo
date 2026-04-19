import { NextRequest, NextResponse } from "next/server";
import CloudConvert from "cloudconvert";

const cloudconvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY!, false);

export const maxDuration = 60;

// Maps FileVelo compression level UI to CloudConvert optimization_profile values
const COMPRESSION_PROFILE: Record<string, string> = {
  low: "web",      // Fastest, largest file — minimal compression
  medium: "print", // Balanced size and quality
  high: "max",     // Maximum reduction, smallest file
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const inputFormat = formData.get("inputFormat") as string | null;
    const outputFormat = formData.get("outputFormat") as string | null;
    const compressionLevel = formData.get("compressionLevel") as string | null;

    if (!file || !inputFormat || !outputFormat) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds the 50 MB limit." }, { status: 413 });
    }

    // Build the convert task — add optimization_profile when compressing PDF→PDF
    const convertTask = {
      operation: "convert" as const,
      input: "upload-file",
      input_format: inputFormat,
      output_format: outputFormat,
      ...(inputFormat === "pdf" && outputFormat === "pdf" && compressionLevel
        ? { optimization_profile: COMPRESSION_PROFILE[compressionLevel] ?? undefined }
        : {}),
    };

    // Create a job with import → convert → export steps
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let job = await cloudconvert.jobs.create({
      tasks: {
        "upload-file": {
          operation: "import/upload",
        },
        "convert-file": convertTask as any,
        "export-file": {
          operation: "export/url",
          input: "convert-file",
          inline: false,
          archive_multiple_files: false,
        },
      },
    });

    // Upload the file
    const uploadTask = job.tasks.find((t) => t.name === "upload-file")!;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await cloudconvert.tasks.upload(uploadTask, buffer as unknown as Blob, file.name);

    // Wait for completion
    job = await cloudconvert.jobs.wait(job.id);

    const exportTask = job.tasks.find((t) => t.name === "export-file");
    if (!exportTask || exportTask.status !== "finished") {
      throw new Error("Conversion failed.");
    }

    const downloadUrl: string | undefined = exportTask.result?.files?.[0]?.url;
    if (!downloadUrl) throw new Error("No download URL returned.");

    // Fetch the converted file and stream it back to the client
    const fileRes = await fetch(downloadUrl);
    if (!fileRes.ok) throw new Error("Failed to fetch converted file.");

    const outputFilename = file.name.replace(`.${inputFormat}`, `.${outputFormat}`);

    return new NextResponse(fileRes.body, {
      status: 200,
      headers: {
        "Content-Type": fileRes.headers.get("Content-Type") ?? "application/octet-stream",
        "Content-Disposition": `attachment; filename="${outputFilename}"`,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    // Detect credit / rate-limit errors from CloudConvert
    if (
      message.toLowerCase().includes("credits") ||
      message.toLowerCase().includes("payment") ||
      message.toLowerCase().includes("limit") ||
      (err as { statusCode?: number })?.statusCode === 402 ||
      (err as { statusCode?: number })?.statusCode === 429
    ) {
      return NextResponse.json(
        {
          error: "CREDIT_LIMIT",
          message:
            "Daily limit reached for this premium tool. Please try again tomorrow, or use our free tools!",
        },
        { status: 429 },
      );
    }

    console.error("[convert]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
