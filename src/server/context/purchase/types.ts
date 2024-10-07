import type { Flower } from "~/server/context/common";

export type PurchaseOrder = {
  supplierName: string;
  deliveryDate: Date;
  purchaseDetails: PurchaseOrderDetail[];
};

export type PurchaseOrderDetail = {
  flower: Flower;
  orderQuantity: number;
};

export type CreatedPurchaseOrder = PurchaseOrder & { id: number };
