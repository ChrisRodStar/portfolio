import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import BackgroundEffect from "@/components/BackgroundEffect";
import Nav from "@/components/Nav";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from "@/components/Footer";


const JetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  metadataBase: new URL("https://chrisrodriguez.dev"),
  title: {
    default: "Christopher Rodriguez - Developer & Designer",
    template: "%s | Christopher Rodriguez",
  },
  description:
    "Developer building modern web applications with clean architecture and great user experiences. Based in Greensboro, NC.",
  keywords: [
    "Christopher Rodriguez",
    "web developer",
    "software engineer",
    "portfolio",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Christopher Rodriguez" }],
  creator: "Christopher Rodriguez",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
            <Analytics />
            <SpeedInsights/>
            <div className="mt-auto p-4 max-w-6xl mx-auto w-full">
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
