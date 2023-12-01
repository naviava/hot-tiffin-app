import { Check, Edit, Trash2, X } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { trpc } from "~/app/_trpc/client";
import { Button } from "~/components/ui/button";

interface Props {
  id: string;
  isEditing: boolean;
  disabled: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CategoryActions = memo(_CategoryActions);
function _CategoryActions({
  id,
  isEditing,
  disabled,
  enableEditing,
  disableEditing,
}: Props) {
  const utils = trpc.useUtils();
  const { mutate: handleDeleteCategory, isLoading } =
    trpc.list.deleteCategory.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: (data) => {
        utils.list.invalidate();
        toast.success(`Deleted category: ${data.name}`);
      },
    });

  return (
    <>
      {!isEditing ? (
        <div>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={disabled || isLoading}
            onClick={enableEditing}
            className="group"
          >
            <Edit className="h-5 w-5 text-muted-foreground group-hover:text-theme" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={disabled || isLoading}
            className="group"
          >
            <Trash2
              onClick={() => handleDeleteCategory(id)}
              className="h-5 w-5 text-muted-foreground group-hover:text-rose-500"
            />
          </Button>
        </div>
      ) : (
        <div>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={disabled || isLoading}
            onClick={disableEditing}
          >
            <X className="h-5 w-5 text-rose-500" />
          </Button>
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            disabled={disabled || isLoading}
          >
            <Check className="h-5 w-5 text-green-600" />
          </Button>
        </div>
      )}
    </>
  );
}
