import { z } from "zod";

export const FlowerId = z.number();

export const CreateFlowerInput = z.object({
  name: z.string(),
  code: z.string(),
  deliveryDays: z.number(),
  purchaseUnit: z.number(),
  maintainableDays: z.number(),
});

export const UpdateFlowerInput = z
  .object({
    id: FlowerId,
  })
  .merge(CreateFlowerInput);
