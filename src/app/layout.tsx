import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "./provider";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gmail Reader",
  description: "Email label",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-4xl">
              <Navbar />
              {children}
            </div>
          </div>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
