import { getServerSession } from "next-auth";

import * as z from "zod";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";

import { db } from "~/lib/db";
import { generateEmployeeId } from "~/lib/generate-employee-id";
import {
  router,
  publicProcedure,
  staffProcedure,
  privateProcedure,
} from "~/server/trpc";
import { GenderType } from "@prisma/client";

export const userRouter = router({
  getUserProfile: publicProcedure.query(async () => {
    const session = await getServerSession();
    if (!session || !session?.user || !session.user.email) return null;

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return null;

    return {
      name: user.name,
      empId: user.empId,
      email: user.email,
      image: user.image,
      role: user.role,
      disabled: user.disabled,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      dob: user.dob && new Date(user.dob),
    };
  }),

  createEmployeeId: staffProcedure.mutation(async ({ ctx }) => {
    if (!!ctx.user.empId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "This user already has an Employee ID",
      });
    }

    let empId = generateEmployeeId();
    let existingEmpId = await db.user.findUnique({
      where: { empId },
    });

    while (!!existingEmpId) {
      empId = generateEmployeeId();
      existingEmpId = await db.user.findUnique({
        where: { empId },
      });
    }

    await db.user.update({
      where: { email: ctx.user.email },
      data: { empId },
    });
  }),

  editMyProfile: privateProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name cannot be empty"),
        gender: z.nativeEnum(GenderType),
        phoneNumber: z
          .string()
          .regex(
            /^(?![- ])(?!.*[- ]$)(?!.*[- ]{2,})[0-9 -]*$/,
            "ex. 413-203... or 413 203...",
          ),
        dob: z
          .string()
          .regex(
            /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}|^$/,
            "Enter the required date format",
          ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, gender, phoneNumber, dob } = input;

      if (new Date(input.dob) > new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Date of birth cannot be in the future",
        });
      }

      const updatedUser = await db.user.update({
        where: { email: ctx.user.email },
        data: {
          name,
          gender,
          phoneNumber,
          dob: input.dob ? new Date(input.dob) : null,
        },
      });

      return updatedUser;
    }),

  changePassword: privateProcedure
    .input(
      z.object({
        currentPassword: z
          .string()
          .min(6, "Old password must've been at least 6 characters"),
        newPassword: z
          .string()
          .min(6, "Password must be at least 6 characters")
          .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
            "Password must contain at least: 6 characters, 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character",
          ),
        confirmPassword: z
          .string()
          .min(6, "Password must be at least 6 characters"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { currentPassword, newPassword, confirmPassword } = input;

      const user = await db.user.findUnique({
        where: { email: ctx.user.email },
        select: { hashedPassword: true },
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      if (!user?.hashedPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "You have used a social login method, so you cannot change your password. Please visit your social account to change your password.",
        });
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.hashedPassword,
      );

      if (!isCurrentPasswordValid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Credentials are invalid",
        });
      }

      if (newPassword !== confirmPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Passwords do not match",
        });
      }

      if (currentPassword === newPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "New password cannot be the same as old password",
        });
      }

      await db.user.update({
        where: { email: ctx.user.email },
        data: { hashedPassword: await bcrypt.hash(newPassword, 10) },
      });

      return true;
    }),
});
