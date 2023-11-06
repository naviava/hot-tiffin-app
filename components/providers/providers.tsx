import TRPCProvider from "./trpc-provider";
import { EdgeStoreProvider } from "~/lib/edgestore";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <TRPCProvider>
      <EdgeStoreProvider>{children}</EdgeStoreProvider>
    </TRPCProvider>
  );
}
