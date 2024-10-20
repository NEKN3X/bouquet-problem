import { createCallerFactory, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { purchaseRouter } from "~/server/context/purchase/router";
import { maintenanceRouter } from "../context/maintenance/router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => "yay!"),
  purchase: purchaseRouter,
  maintenance: maintenanceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
