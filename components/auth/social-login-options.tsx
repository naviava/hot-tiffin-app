import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";

interface Props {}

export function SocialLoginOptions({}: Props) {
  return (
    <div className="flex items-center gap-x-2">
      <Button variant="outline" onClick={() => signIn("google")}>
        <FcGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button variant="outline" onClick={() => signIn("github")}>
        <FaGithub className="mr-2 h-4 w-4" />
        Github
      </Button>
    </div>
  );
}
