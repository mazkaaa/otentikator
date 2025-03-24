import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui";

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Otentikator – Secure 2FA TOTP Generator",
  description:
    "Otentikator is a lightweight web-based 2FA authenticator that securely generates TOTP codes using local storage. No cloud, no tracking, just privacy-focused security.",
  authors: [
    {
      name: "Azka",
      url: "https://mazka.dev/",
    },
  ],
  robots: "index, follow",
  openGraph: {
    title: "Otentikaor – Secure 2FA TOTP Generator",
    description: "A lightweight, privacy-focused web-based 2FA authenticator.",
    url: "https://otentikator.mazka.dev/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
