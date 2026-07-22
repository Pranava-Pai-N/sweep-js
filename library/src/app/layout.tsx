import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sweep-js | Clean up project cache folders",
  description:
    "A lightweight CLI for removing common generated folders such as node_modules, .next, dist, build, and __pycache__.",
  icons: {
    icon: "/assets/logo.webp"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster
          position="top-right"
          theme="dark"
          richColors
          duration={3000}
        />
        {children}
      </body>
    </html>
  );
}
