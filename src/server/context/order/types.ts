import { type ResultAsync } from "neverthrow";

// ---
// 入力データ
// ---

export type CustomerId = number;
export type BouquetId = number;

export type UnvalidatedAddress = {
  address1: string;
  address2?: string | undefined;
};

export type UnvalidatedOrder = {
  customerId: number;
  senderName: string;
  bouquetId: number;
  deliveryDate: Date;
  deliveryAddress: UnvalidatedAddress;
  orderQuantity: number;
};

// ---
// 入力コマンド
// ---

export type UserCommand<T> = {
  data: T;
  timestamp: Date;
  userId: number;
};

export type PlaceOrderCommand = UserCommand<UnvalidatedOrder>;

// ---
// パブリックAPI
// ---

// 受注確定ワークフローの成功出力
export type OrderPlaced = undefined;
// export type BillableOrderPlaced = undefined;
// export type OrderAcknowledgementSent = undefined;
export type PlaceOrderEvent = OrderPlaced; // | BillableOrderPlaced | OrderAcknowledgementSent;

// 受注確定ワークフローの失敗出力
export type PlaceOrderError = undefined;

export type PlaceOrderWorkflow = (command: PlaceOrderCommand) => ResultAsync<PlaceOrderEvent, PlaceOrderError>;
