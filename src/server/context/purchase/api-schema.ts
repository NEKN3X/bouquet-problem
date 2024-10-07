import { z } from "zod";
import { DateString } from "~/utils/zod-schema";

const OrderDetail = z.object({
  flowerId: z.number(),
  orderUnit: z.number(),
});

export const PlaceOrderInput = z.object({
  supplierName: z.string(),
  deliveryDate: DateString,
  details: z.array(OrderDetail).min(1),
});

export type PlaceOrderInput = z.infer<typeof PlaceOrderInput>;
