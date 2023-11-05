import Image from "next/image";
import { Separator } from "~/components/ui/separator";

interface Props {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  customerNote?: string;
}

export default function OrderPanelItem({
  id,
  name,
  price,
  quantity,
  imageUrl,
  customerNote,
}: Props) {
  return (
    <>
      <div className="flex gap-x-4">
        <div className="flex h-[60px] w-[60px] shrink-0 content-center items-center justify-center rounded-2xl bg-theme/20">
          <Image
            src={imageUrl ?? "/menu-item-placeholder-image.jpg"}
            alt={name}
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
        </div>
        <div className="w-full space-y-1">
          <h3 className="line-clamp-1 overflow-hidden text-lg font-bold">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {!!customerNote ? (
              <>Note: {customerNote}</>
            ) : (
              <span className="text-xs font-medium italic">No note added</span>
            )}
          </p>
          <h4 className="text-sm font-bold">${price}</h4>
          <div className="flex items-center justify-between">
            <div>Quantity</div>
            <button type="button" className="mr-4">
              Edit
            </button>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
}
