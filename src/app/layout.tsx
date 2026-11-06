import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { Motion } from "@/components/Motion";
import { LINKS } from "@/content";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

const URL_ = "https://iliasjf.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(URL_),
  title: "Ilias Jafaoui · Front-end developer",
  description: "Front-end developer building fast, polished stores, booking apps and dashboards in React, Next.js and TypeScript. Based in Morocco, open to remote work.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "profile",
    url: URL_,
    title: "Ilias Jafaoui · Front-end developer",
    description: "Stores, booking apps and dashboards in React, Next.js and TypeScript. Open to remote work.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Ilias Jafaoui, front-end developer" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

// Who this is, for search engines.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ilias Jafaoui",
  jobTitle: "Front-end developer",
  url: URL_,
  address: { "@type": "PostalAddress", addressLocality: "Ben Slimane", addressCountry: "MA" },
  sameAs: [LINKS.linkedin, LINKS.github],
  knowsAbout: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Web accessibility"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={schibsted.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        {children}
        <Motion />
      </body>
    </html>
  );
}
