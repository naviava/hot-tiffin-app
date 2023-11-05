import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import { Toaster } from "sonner";
import Providers from "~/components/providers/providers";

import { cn } from "~/lib/utils";

const font = Nunito_Sans({ subsets: ["latin"] });

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-neutral-50", font.className)}>
        <Providers>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
