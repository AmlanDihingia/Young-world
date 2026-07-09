import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wave the White",
  description: "Join the World's Biggest Friendship Roll Call",
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
