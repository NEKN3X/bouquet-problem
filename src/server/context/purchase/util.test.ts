import dayjs from "dayjs";
import { checkDeliverable } from "./util";

const deliveryToday = {
  supplierName: "test",
  deliveryDate: new Date(),
  purchaseDetails: [
    {
      flower: {
        id: 1,
        code: "A0001",
        name: "flower1",
        deliveryDays: 1,
        purchaseUnit: 10,
        maintainableDays: 4,
      },
      orderQuantity: 10,
    },
    {
      flower: {
        id: 2,
        code: "A0002",
        name: "flower2",
        purchaseUnit: 20,
        deliveryDays: 2,
        maintainableDays: 4,
      },
      orderQuantity: 40,
    },
  ],
};

test("発注日を納品希望日にすると失敗する", () => {
  expect(checkDeliverable(deliveryToday)).toBe(false);
});

test("納品希望日が発注リードタイムより前の日付なら失敗する", () => {
  const order = {
    ...deliveryToday,
    deliveryDate: dayjs(deliveryToday.deliveryDate).add(1, "day").toDate(),
  };
  expect(checkDeliverable(order)).toBe(false);
});

test("納品希望日が発注リードタイムより後の日付なら成功する", () => {
  const order = {
    ...deliveryToday,
    deliveryDate: dayjs(deliveryToday.deliveryDate).add(3, "day").toDate(),
  };
  expect(checkDeliverable(order)).toBe(true);
});
