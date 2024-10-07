import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import dayjs from "dayjs";
import styles from "./index.module.css";

export default async function Home() {
  const createOrder = await api.purchase.createOrder({
    supplierName: "サプライヤーA",
    deliveryDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
    details: [
      { flowerId: 1, orderUnit: 1 },
      { flowerId: 2, orderUnit: 2 },
    ],
  });
  const session = await getServerAuthSession();

  return (
    // <HydrateClient>
    <main className={styles.main}>
      <div className={styles.container}></div>
    </main>
    // </HydrateClient>
  );
}
