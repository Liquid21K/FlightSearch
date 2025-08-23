// app/layout.tsx
import { Inter } from "next/font/google";
import { Bebas_Neue, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Bars/Navbar";
import Footer from "./components/Bars/Footer";
import AuthProviderNext  from "./SessionProvider";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-bebas-neue',
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "Flight Search",
  description: "Find your perfect flight",
  links: [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Dancing+Script&family=Poppins:wght@400;600&family=Playfair+Display:wght@600&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://rsms.me/inter/inter.css",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${poppins.variable}`}>
      <body className="flex flex-col min-h-screen">
        <HeroUIProvider>
          <AuthProviderNext >
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </AuthProviderNext >
        </HeroUIProvider>
      </body>
    </html>
  );
}
