import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

interface Props {
  placeholder?: string;
  className?: string;
}

export default function SearchInput({ placeholder, className }: Props) {
  return (
    <div className="relative flex w-fit">
      <Input
        placeholder={placeholder}
        className={cn("w-[15rem] bg-white py-2 md:w-[25rem]", className)}
      />
      <button type="button">
        <Search className="absolute right-4 top-[50%] -translate-y-1/2 text-muted-foreground" />
      </button>
    </div>
  );
}
