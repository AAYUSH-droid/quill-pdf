import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
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

  //delete file
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() })) //provide file.id in input
    .mutation(async ({ input, ctx }) => {
      const { auth } = ctx;
      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId: auth.userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      await db.file.delete({
        where: {
          id: input.id,
        },
      });
      return file;
    }),

  //get a particular file with file id and userID
  getFile: privateProcedure
    .input(z.object({ fileId: z.string(), userID: z.string() }))
    .query(async ({ input, ctx }) => {
      const { auth } = ctx;
      const file = await db.file.findFirst({
        where: {
          id: input?.fileId, //fileID
          userId: auth.userId, //userID
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      return file;
    }),

  //get file for polling with uploadthing
  getFileForPolling: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { auth } = ctx;
      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId: auth.userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      return file;
    }),
});
