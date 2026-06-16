import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "./context/SettingsContext";
import PhoneFrame from "./components/PhoneFrame";
import BottomNav from "./components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SvaraLens",
  description: "Asisten Baca Cerdas Anda — pemindai dokumen & kemasan dengan suara.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fbbf24",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <SettingsProvider>
          <PhoneFrame>
            {children}
            <BottomNav />
          </PhoneFrame>
        </SettingsProvider>
      </body>
    </html>
  );
}
