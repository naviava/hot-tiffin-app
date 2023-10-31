import { getServerSession } from "next-auth";

import SessionProvider from "./session-provider";
import TRPCProvider from "./trpc-provider";

import { EdgeStoreProvider } from "~/lib/edgestore";

interface ProvidersProps {
  children: React.ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
  const session = await getServerSession();

  return (
    <SessionProvider session={session}>
      <TRPCProvider>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </TRPCProvider>
    </SessionProvider>
  );
}
