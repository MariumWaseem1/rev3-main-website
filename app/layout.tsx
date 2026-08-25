import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./interactive.css";
import "./redesign.css";
import "./brand-fixes.css";
import "./contact.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rev3.uk"),
  title: "Rev3 | Practical AI for business",
  description: "Meet Rev3.Business and Rev3.Voice, two practical AI platforms built to move work and turn conversations into action.",
  icons: { icon: "/rev3-logo.png" },
  openGraph: { title: "Rev3 | Practical AI for business", description: "AI that moves work and turns conversations into action.", url: "https://rev3.uk", siteName: "Rev3", type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Rev3 | Practical AI for business", description: "AI that moves work and turns conversations into action.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={montserrat.variable}>{children}</body></html>;
}
