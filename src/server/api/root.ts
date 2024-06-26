import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { authCallbackRouter } from "./routers/authCallback";
import { filesRouter } from "./routers/files";

export const appRouter = createTRPCRouter({
  post: postRouter,
  authCallback: authCallbackRouter,
  files: filesRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
