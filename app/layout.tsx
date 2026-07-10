import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Young World Entertainment | Wave the White",
  description: "The World's Biggest Friendship Roll Call. Where communities from all corners of the world check in on Friendship Day to make sure nobody gets left out.",
  keywords: ["Young World Entertainment", "Wave the White", "Friendship Day", "Global Community", "Roll Call"],
  openGraph: {
    title: "Young World Entertainment | Wave the White",
    description: "The World's Biggest Friendship Roll Call. Where communities from all corners of the world check in on Friendship Day.",
    url: "https://youngworld.life",
    siteName: "Young World Entertainment",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Young World Entertainment | Wave the White",
    description: "The World's Biggest Friendship Roll Call. Where communities from all corners of the world check in on Friendship Day.",
  },
};

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased bg-background text-foreground bg-gradient-to-br from-white to-sky-50 min-h-screen font-light selection:bg-sky-200 selection:text-sky-900 flex flex-col`}
      >
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
