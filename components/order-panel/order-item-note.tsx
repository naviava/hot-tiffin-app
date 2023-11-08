import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface Props {
  customerNote?: string | undefined | null;
}

export default function OrderItemNote({ customerNote = "" }: Props) {
  return (
    <>
      {!!customerNote ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="line-clamp-1 cursor-default">
                Note: {customerNote}
              </p>
            </TooltipTrigger>
            {customerNote.length > 20 && (
              <TooltipContent className="max-w-xs">
                <p>{customerNote}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span className="text-xs font-medium italic">No note added</span>
      )}
    </>
  );
}
