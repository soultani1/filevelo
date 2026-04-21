import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FileVelo – Fast & Secure Online PDF Tools",
    template: "%s | FileVelo",
  },
  description:
    "Free, fast, and secure online PDF tools — merge, split, compress, convert, and edit without sign-ups. Browser-based privacy or encrypted cloud processing.",
  metadataBase: new URL("https://filevelo.com"),
  openGraph: {
    siteName: "FileVelo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1 pt-[73px]">{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-2XETC7DMB1" />
      </body>
    </html>
  );
}
