import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
import { site } from "@/content/site";
import "./globals.css";

// Fonts are self-hosted (see src/fonts), so builds never depend on a font CDN.
const bricolage = localFont({
  src: "../fonts/bricolage-grotesque.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});
const hanken = localFont({
  src: "../fonts/hanken-grotesk.woff2",
  variable: "--font-hanken",
  weight: "100 900",
  display: "swap",
});
const jetbrains = localFont({
  src: "../fonts/jetbrains-mono.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} | ${site.role}`,
  description: site.description,
  authors: [{ name: site.name, url: site.links.linkedin }],
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0b07" },
    { media: "(prefers-color-scheme: light)", color: "#f2f4ea" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes sets data-theme before hydration, so the attribute differs from the server render.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
