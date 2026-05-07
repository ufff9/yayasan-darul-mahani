import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Darul Qur'an Mahani Al-Qubro",
  description:
    "Landing page Yayasan Darul Qur'an Mahani Al-Qubro dengan program tahfidz, asrama, dan pengumuman mingguan.",
  metadataBase: new URL("https://yayasan-darul-mahani.vercel.app/"),
  openGraph: {
    title: "Darul Qur'an Mahani Al-Qubro",
    description:
      "Landing page Yayasan Darul Qur'an Mahani Al-Qubro dengan program tahfidz, asrama, dan pengumuman mingguan.",
    url: "https://yayasan-darul-mahani.vercel.app/",
    siteName: "Darul Qur'an Mahani Al-Qubro",
    images: [
      {
        url: "/logo-yayasan.jpeg",
        width: 1200,
        height: 630,
        alt: "Logo Yayasan Darul Qur'an Mahani Al-Qubro",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darul Qur'an Mahani Al-Qubro",
    description:
      "Landing page Yayasan Darul Qur'an Mahani Al-Qubro dengan program tahfidz, asrama, dan pengumuman mingguan.",
    images: ["/logo-yayasan.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-yayasan.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-950 font-body scroll-smooth">
        <link rel="manifest" href="/manifest.json" />
        {children}
      </body>
    </html>
  );
}
