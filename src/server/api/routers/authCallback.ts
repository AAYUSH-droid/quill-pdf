import { z } from "zod";
import { auth, currentUser } from "@clerk/nextjs";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/server/db";

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
});
