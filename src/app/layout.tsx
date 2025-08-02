import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Streak Builder",
  description: "Start building good habits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
