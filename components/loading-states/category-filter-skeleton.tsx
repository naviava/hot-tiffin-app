import { Skeleton } from "~/components/ui/skeleton";

export default function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-4 md:gap-4">
      {new Array(4).fill(null).map((_, idx) => (
        <Skeleton
          key={idx}
          className="flex h-10 w-36 shrink-0 grow-0 items-center rounded-full bg-neutral-500/10 px-4 py-2 font-medium text-muted-foreground"
        >
          <Skeleton className="mr-2 h-5 w-5 rounded-full bg-neutral-300" />
          <Skeleton className="mr-2 h-5 w-24 rounded-full bg-neutral-300" />
        </Skeleton>
      ))}
    </div>
  );
}
