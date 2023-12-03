import { Info } from "lucide-react";
import { FcLike } from "react-icons/fc";
import { Skeleton } from "~/components/ui/skeleton";

export default function MenuGridSkeleton() {
  return (
    <div className="grid grid-cols-1 place-content-center place-items-center gap-x-8 gap-y-20 py-10 md:grid-cols-2 lg:grid-cols-3">
      {new Array(3).fill(null).map((_, idx) => (
        <div
          key={idx}
          className="flex w-[17rem] cursor-pointer select-none flex-col items-center rounded-[2rem] bg-white shadow-lg"
        >
          <Skeleton className="h-[160px] w-[160px] -translate-y-10 rounded-full" />
          <div className="-mt-6 mb-4 space-y-2">
            <div className="space-y-2">
              <Skeleton className="mx-auto h-3 w-[6rem]" />
              <Skeleton className="mx-4 h-6 w-[10rem]" />
            </div>
            <Skeleton className="mx-auto h-6 w-[3rem]" />
          </div>
          <div className="mb-8 flex w-full items-center justify-around">
            <div className="flex flex-shrink-0 items-center transition">
              <FcLike className="mr-2" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <div className="text-muted-foreground transition hover:scale-110">
              <Skeleton className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
