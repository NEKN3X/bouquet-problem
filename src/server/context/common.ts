export type Flower = {
  id: number;
  code: string;
  name: string;
  deliveryDays: number;
  purchaseUnit: number;
  maintainableDays: number;
};

export type Bouquet = {
  code: string;
  name: string;
  components: BouquetComponent[];
};

export type BouquetComponent = {
  bouquet: Bouquet;
  flower: Flower;
  flowerQuantity: number;
};
