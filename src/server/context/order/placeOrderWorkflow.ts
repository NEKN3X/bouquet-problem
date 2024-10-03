import { type ResultAsync } from "neverthrow";
import { type UnvalidatedAddress, type UnvalidatedOrder } from "~/server/context/order/types";

// ---
// 注文のライフサイクル
// ---

export type OrderId = number;
export type CustomerInfo = undefined;
export type Address = undefined;
export type OrderQuantity = number;
export type DeliveryDate = Date;

export type ValidatedOrder = {
  orderId: OrderId;
  customerInfo: CustomerInfo;
  DeliveryDate: DeliveryDate;
  DeliveryAddress: Address;
  orderQuantity: OrderQuantity;
};

// export type PricedOrder

// 全状態の結合
export type Order = UnvalidatedOrder | ValidatedOrder;

// ---
// 内部ステップの定義
// ---

// --- 注文の検証 ---

export type BouquetCode = string;
export type CheckBouquetCodeExists = (bouquetCode: BouquetCode) => boolean;

export type AddressValidationError = undefined;
export type CheckedAddress = undefined;
export type CheckAddressExists = (address: UnvalidatedAddress) => ResultAsync<CheckedAddress, AddressValidationError>;

export type ValidationError = undefined;

export type ValidateOrder = (
  checkBouquetCodeExists: CheckBouquetCodeExists
) => (
  checkAddressExists: CheckAddressExists
) => (order: UnvalidatedOrder) => ResultAsync<ValidatedOrder, ValidationError>;

// --- 注文の価格計算 ---
// etc
