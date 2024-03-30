import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { auth } from "@clerk/nextjs";

export const filesRouter = createTRPCRouter({
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { auth, db } = ctx;
    //auth contains userID
    return await db.file.findMany({
      where: {
        userId: auth.userId,
      },
    });
  }),
});
