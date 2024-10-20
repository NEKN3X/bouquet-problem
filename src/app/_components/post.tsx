"use client";

import { Button } from "@mantine/core";
import dayjs from "dayjs";
import { api } from "~/trpc/react";

export function LatestPost() {
  // orderボタンを作る
  const createOrder = api.purchase.createOrder.useMutation();

  return (
    <>
      <Button
        onClick={() =>
          createOrder.mutate({
            supplierName: "サプライヤーA",
            deliveryDate: dayjs().add(3, "day").format("YYYY-MM-DD"),
            details: [{ flowerId: 1, orderUnit: 1 }],
          })
        }
      >
        Order
      </Button>
    </>
  );
}
