import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Regify - The Universal Component Registry CLI",
    template: "%s | Regify",
  },
  description: "Turn components into shareable registries. A universal CLI to build registries compatible with shadcn/ui.",
  keywords: ["shadcn", "registry", "component-registry", "cli", "react", "tailwind"],
  openGraph: {
    title: "Regify",
    description: "Turn components into shareable registries compatible with shadcn/ui.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regify",
    description: "Turn components into shareable registries compatible with shadcn/ui.",
  },
};

import { Header } from "@/components/header";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="Regify" />
      <link rel="manifest" href="/site.webmanifest" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-accent/30 selection:text-foreground`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
