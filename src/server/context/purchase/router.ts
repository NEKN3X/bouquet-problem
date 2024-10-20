import { createTRPCRouter } from "~/server/api/trpc";
import { createPurchaseOrder } from "~/server/context/purchase/create-order";

export const purchaseRouter = createTRPCRouter({
  createOrder: createPurchaseOrder,
});
