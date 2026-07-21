import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import { Jersey_10 } from "next/font/google";
import { Space_Mono } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastNotification from "@/components/ui/ToastNotification";
import Cart from "@/components/cart/Cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: "400", // or "700" for bold
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jersey = Jersey_10({
  variable: "--font-jersey",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpawnPoint",
  description: "Next-gen gaming store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jersey.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        <Cart />
        <Navbar />
        {children}
        <Footer />
        
        {/* Move it to the bottom of the body */}
        <ToastNotification />
      </body>
    </html>
  );
}