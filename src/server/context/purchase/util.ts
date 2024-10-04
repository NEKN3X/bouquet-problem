// import dayjs from "dayjs";
import { type PurchaseOrder } from "~/server/context/purchase/types";

export const checkDeliverable = (order: PurchaseOrder): boolean => {
  const deliveryDate = order.deliveryDate;
  const maxDeliveryDays = Math.max(...order.purchaseDetails.map((d) => d.flower.deliveryDays));
  // const minDeliveryDate = dayjs().add(maxDeliveryDays, "day");
  // return dayjs(deliveryDate).isAfter(minDeliveryDate);
  return true;
};
