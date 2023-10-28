import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "~/components/providers/providers";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hot Tiffin",
  description: "Restaurant management made easy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
