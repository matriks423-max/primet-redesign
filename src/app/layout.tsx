import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"], // latin-ext covers Latvian ā č ē ģ ī ķ ļ ņ š ū ž
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Primet — Pārtikas iekārtu serviss un piegāde Latvijā",
  description:
    "SIA Primet — profesionāla pārtikas rūpniecības iekārtu piegāde, uzstādīšana un serviss Latvijā un Baltijā.",
  metadataBase: new URL("https://primet.lv"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lv" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <ClientProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
