import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Young World | Heat Check Challenge",
  description: "Turn $1 into your biggest creator break.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased bg-black text-white font-sans selection:bg-[var(--primary)] selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
