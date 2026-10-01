import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

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
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1279459657280576');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body
        className={`antialiased bg-background text-foreground bg-gradient-to-br from-white to-sky-50 min-h-screen font-light selection:bg-sky-200 selection:text-sky-900 flex flex-col`}
      >
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1279459657280576&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

