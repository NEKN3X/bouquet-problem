import { TRPCError } from "@trpc/server";
import * as R from "remeda";
import { adminProcedure } from "~/server/api/trpc";
import { CreatePurchaseOrderInput } from "~/server/context/purchase/api-schema";
import { type CreatedPurchaseOrder, type PurchaseOrder } from "~/server/context/purchase/types";
import { checkDeliverable } from "~/server/context/purchase/util";
import { db } from "~/server/db";

const createOrder = async (input: CreatePurchaseOrderInput): Promise<PurchaseOrder> => {
  const flowerIds = input.details.map(R.prop("flowerId"));
  const flowers = await db.flower.findMany({ where: { id: { in: flowerIds } } });
  const flowerMap = new Map(flowers.map((f) => [f.id, f]));
  const purchaseDetails = input.details.map((d) => {
    const flower = flowerMap.get(d.flowerId);
    if (flower === undefined) throw new TRPCError({ code: "BAD_REQUEST", message: "選択した花が見つかりません" });
    return {
      flower,
      orderUnit: d.orderUnit,
      orderQuantity: d.orderUnit * flower.purchaseUnit,
    };
  });

  return {
    supplierName: input.supplierName,
    deliveryDate: new Date(input.deliveryDate),
    purchaseDetails: purchaseDetails,
  };
};

const persistOrder = async (order: PurchaseOrder): Promise<CreatedPurchaseOrder> => {
  const data = await db.purchaseOrder.create({
    data: {
      supplierName: order.supplierName,
      deliveryDate: order.deliveryDate,
      purchaseDetails: {
        createMany: {
          data: order.purchaseDetails.map((d) => ({
            flowerId: d.flower.id,
            orderQuantity: d.orderQuantity,
          })),
        },
      },
    },
    include: {
      purchaseDetails: { include: { flower: true } },
    },
  });

  return data;
};

export const createPurchaseOrder = adminProcedure.input(CreatePurchaseOrderInput).mutation(async ({ input }) => {
  const order = await createOrder(input);

  if (!checkDeliverable(order))
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "納品希望日は、発注リードタイムよりあとの日付を入力してください",
    });

  const createdPurchase = await persistOrder(order);

  return createdPurchase;
});
