import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import { Toaster } from "sonner";
import { getServerSession } from "next-auth";

import Providers from "~/components/providers/providers";
import SessionProvider from "~/components/providers/session-provider";

import { cn } from "~/lib/utils";

const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Hot Tiffin",
    template: `%s | Hot Tiffin`,
  },
  description: "Restaurant management made easy.",
  icons: [
    {
      url: "/logo-hot-tiffin.svg",
      href: "/logo-hot-tiffin.svg",
    },
  ],
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
