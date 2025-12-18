import { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";



export const metadata = {
  title: "Price Buddy",
  description: "Created by sriram venkatesan",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        
      >
        {children}

        <Toaster richColors/>
      </body>

    </html>
  );
}
