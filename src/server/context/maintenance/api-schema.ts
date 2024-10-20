import { z } from "zod";

export const FlowerId = z.number();

export const CreateFlowerInput = z.object({
  name: z.string().min(1).max(20),
  code: z.string().regex(/^HN[0-9]{4}$/, "コードはHNXXXXの形式で入力してください"), // HNXXXX
  deliveryDays: z.number().min(1).max(30),
  purchaseUnit: z.number().min(1).max(100),
  maintainableDays: z.number().min(1).max(90),
});

export const UpdateFlowerInput = z
  .object({
    id: FlowerId,
  })
  .merge(CreateFlowerInput);
