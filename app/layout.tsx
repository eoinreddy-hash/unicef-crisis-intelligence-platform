import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "UNICEF Crisis Intelligence Platform",
    template: "%s | UNICEF Crisis Intelligence Platform"
  },
  description:
    "AI-powered humanitarian crisis monitoring prototype for UNICEF leadership, with real-time crisis mapping, incident intelligence, and executive-ready summaries.",
  keywords: [
    "UNICEF",
    "humanitarian intelligence",
    "crisis monitoring",
    "AI dashboard",
    "humanitarian response",
    "executive dashboard"
  ],
  applicationName: "UNICEF Crisis Intelligence Platform",
  category: "technology",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg"
  },
  openGraph: {
    title: "UNICEF Crisis Intelligence Platform",
    description:
      "Real-time humanitarian intelligence for faster response. A premium prototype for crisis mapping, incident monitoring, and AI-assisted summaries.",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "UNICEF Crisis Intelligence Platform preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "UNICEF Crisis Intelligence Platform",
    description:
      "AI-powered crisis monitoring with live maps, humanitarian needs analytics, and executive-ready summaries.",
    images: ["/og-image.svg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
