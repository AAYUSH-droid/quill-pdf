import { auth } from "@clerk/nextjs";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { redirect } from "next/navigation";

export const authCallbackRouter = createTRPCRouter({
  authCallback: publicProcedure.query(async () => {
    const { userId } = auth();
    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });
    //check if user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        user_id: userId,
      },
    });
    if (!dbUser) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
    return { success: true };
  }),

  returnUser: privateProcedure.query(async ({ ctx }) => {
    const { auth, db } = ctx;
    const user = await db.user.findFirst({
      where: {
        user_id: auth.userId,
      },
    });
    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    return user;
  }),
});
