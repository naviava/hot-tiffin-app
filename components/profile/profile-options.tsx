"use client";

import { v4 as uuid } from "uuid";
import { signOut } from "next-auth/react";
import { IoLogOut } from "react-icons/io5";
import { motion, Variants } from "framer-motion";

import UserAvatar from "~/components/user-avatar";
import ProfileOptionItem from "~/components/profile/profile-option-item";

import { serverClient } from "~/app/_trpc/server-client";

const OPTIONS = [
  {
    id: uuid(),
    label: "Personal Information",
    tabName: "personal_info",
  },
  {
    id: uuid(),
    label: "Change Password",
    tabName: "change_password",
  },
];

const optionsPanelVariants: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, staggerChildren: 0.1 },
  },
};

const listVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

interface Props {
  user: Awaited<ReturnType<typeof serverClient.user.getUserProfile>>;
}

export default function ProfileOptions({ user }: Props) {
  return (
    <motion.section
      variants={optionsPanelVariants}
      initial="initial"
      animate="animate"
      exit="initial"
      className="flex w-full flex-col items-center space-y-8 rounded-[2rem] bg-white py-8 md:w-[15rem] lg:w-[20rem]"
    >
      <div className="space-y-1">
        <div className="m-auto w-fit">
          <UserAvatar size="xl" initialData={user} />
        </div>
        <h1 className="text-center text-2xl font-extrabold">{user?.name}</h1>
        <p className="text-center font-medium">{user?.empId}</p>
      </div>
      <motion.ul
        variants={listVariants}
        initial="initial"
        animate="animate"
        exit="initial"
        className="w-full space-y-8"
      >
        {OPTIONS.map((option) => (
          <ProfileOptionItem
            key={option.id}
            label={option.label}
            tabName={option.tabName}
            animationVariants={listVariants}
          />
        ))}
        <motion.li
          variants={listVariants}
          onClick={() => signOut()}
          className="relative mx-auto flex w-[70%] cursor-pointer items-center rounded-full px-6 py-2 text-muted-foreground transition-all md:w-[90%] md:px-3 lg:w-[80%] lg:px-6"
        >
          <IoLogOut className="mr-4 h-5 w-5" />
          Log Out
        </motion.li>
      </motion.ul>
    </motion.section>
  );
}
