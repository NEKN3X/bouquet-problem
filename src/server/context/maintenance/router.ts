import { createTRPCRouter } from "~/server/api/trpc";
import { createFlower, getFlower, getFlowers, updateFlower } from "./flower-procedure";

export const maintenanceRouter = createTRPCRouter({
  flowers: getFlowers,
  flower: getFlower,
  createFlower,
  updateFlower,
});
