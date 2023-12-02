"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { trpc } from "~/app/_trpc/client";
import { serverClient } from "~/app/_trpc/server-client";

const avatarVariants = cva("", {
  variants: {
    size: {
      default: "",
      xl: "h-32 w-32 text-6xl",
    },
  },
  defaultVariants: { size: "default" },
});

type AvatarVariantsProps = VariantProps<typeof avatarVariants>;
interface UserAvatarProps extends AvatarVariantsProps {
  initialData?: Awaited<ReturnType<typeof serverClient.user.getUserProfile>>;
}

export default function UserAvatar({ size, initialData }: UserAvatarProps) {
  const { data: user } = trpc.user.getUserProfile.useQuery();

  if (!user) return null;

  return (
    <Avatar className={avatarVariants({ size })}>
      <AvatarImage
        src={user.image || ""}
        alt={`Profile picture of ${user.name}`}
      />
      <AvatarFallback className="font-bold">
        {user.name[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
