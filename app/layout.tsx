import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { Header } from "@/components/header";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const pretendard = localFont({
  src: "./assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata = {
  title: "이언상 개발블로그",
  description: "이언상 개발블로그",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${pretendard.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <div className="pb-10">
            <main>{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
