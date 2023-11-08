import { Dispatch, SetStateAction, useState } from "react";
import { Check, X } from "lucide-react";
import { useOrderStore } from "~/store/use-order-store";

interface Props {
  id: string;
  customerNote: string | undefined;
  setIsEditingNote: Dispatch<SetStateAction<boolean>>;
}

export default function OrderItemNoteEditor({
  id,
  customerNote,
  setIsEditingNote,
}: Props) {
  const { setCustomerNote } = useOrderStore();
  const [inputValue, setInputValue] = useState(customerNote ?? "");

  return (
    <>
      <input
        type="text"
        maxLength={150}
        value={inputValue}
        onChange={(evt) => setInputValue(evt.target.value)}
        className="w-[70%] rounded-lg border border-neutral-200 px-2 py-1 text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <button
        className="rounded-full bg-rose-500 p-1"
        onClick={() => {
          setInputValue(customerNote ?? "");
          setIsEditingNote(false);
        }}
      >
        <X className="h-4 w-4 text-white" />
      </button>
      <button
        className="rounded-full bg-emerald-500 p-1"
        onClick={() => {
          setCustomerNote(id, inputValue);
          setIsEditingNote(false);
        }}
      >
        <Check className="h-4 w-4 text-white" />
      </button>
    </>
  );
}
