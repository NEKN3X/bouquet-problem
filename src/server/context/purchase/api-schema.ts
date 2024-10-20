import { z } from "zod";
import { DateString } from "~/utils/zod-schema";

const PurchaseOrderDetail = z.object({
  flowerId: z.number(),
  orderUnit: z.number(),
});

export const CreatePurchaseOrderInput = z.object({
  supplierName: z.string(),
  deliveryDate: DateString,
  details: z.array(PurchaseOrderDetail).min(1),
});

export type CreatePurchaseOrderInput = z.infer<typeof CreatePurchaseOrderInput>;
