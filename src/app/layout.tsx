import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | Blog",
  },
  description: "A minimal blog built with Next.js and Velite",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Blog",
    description: "A minimal blog built with Next.js and Velite",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
