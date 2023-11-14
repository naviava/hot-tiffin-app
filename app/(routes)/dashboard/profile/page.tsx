import { redirect } from "next/navigation";
import { serverClient } from "~/app/_trpc/server-client";
import EditFormTab from "~/components/profile/edit-form-tab";
import PersonalInfoForm from "~/components/profile/personal-info-form";
import ProfileOptions from "~/components/profile/profile-options";

export default async function ProfilePage() {
  const user = await serverClient.user.getUserProfile();
  if (!user) return redirect("/");

  return (
    <article className="space-y-4 px-4 pb-10 pt-4 md:flex md:h-full md:gap-x-4 md:space-y-0 lg:gap-x-6">
      <ProfileOptions user={user} />
      <EditFormTab />
    </article>
  );
}
