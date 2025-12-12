import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import BackgroundEffect from "@/components/BackgroundEffect";

const JetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "christopher rodriguez - portfolio",
  description: "developer & designer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${JetBrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <BackgroundEffect />
          <div className="min-h-screen flex flex-col relative z-10">
            <div className="p-4 max-w-6xl mx-auto w-full">
              <Nav />
            </div>
            {children}
            <div className="mt-auto p-4 max-w-6xl mx-auto w-full">
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
