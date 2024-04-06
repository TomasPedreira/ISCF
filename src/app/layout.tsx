import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ISCF",
  description: "Robotic Arm Monitoring App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/descarregar.jpg" />
      </head>
      <body className={inter.className}>
        <div>
          <Image
            className="bg-img"
            src="/bg-app.png"
            fill={true}
            alt="bg image"
          />
          {children}
        </div>
      </body>
    </html>
  );
}
