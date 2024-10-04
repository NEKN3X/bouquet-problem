import { createTRPCRouter } from "~/server/api/trpc";
import { createOrder } from "~/server/context/purchase/create-order";

export const purchaseRouter = createTRPCRouter({
  createOrder: createOrder,
});
