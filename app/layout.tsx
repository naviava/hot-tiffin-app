import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import { Toaster } from "sonner";
import { getServerSession } from "next-auth";

import Providers from "~/components/providers/providers";
import SessionProvider from "~/components/providers/session-provider";

import { cn } from "~/lib/utils";
import { redirect } from "next/navigation";

const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hot Tiffin",
  description: "Restaurant management made easy.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-neutral-50", font.className)}>
        <SessionProvider session={session}>
          <Providers>
            {children}
            <Toaster position="bottom-right" />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
