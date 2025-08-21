import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KFH",
  description: "Inventory Management System",
  icons: {
    icon: "/kfh_log.png",   
    
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
