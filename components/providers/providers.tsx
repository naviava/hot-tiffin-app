import { TRPCProvider } from "./trpc-provider";
import { ModalProvider } from "./modal-provider";
import { EdgeStoreProvider } from "~/lib/edgestore";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <TRPCProvider>
      <EdgeStoreProvider>
        <ModalProvider />
        {children}
      </EdgeStoreProvider>
    </TRPCProvider>
  );
}
