import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import dayjs from "dayjs";
import styles from "./index.module.css";

export default async function Home() {
  // const hello = await api.healthcheck();
  // const session = await getServerAuthSession();

  // void api.post.getLatest.prefetch();
  const now = dayjs().format("YYYY-MM-DD HH:mm:ss");

  return (
    // <HydrateClient>
    <main className={styles.main}>
      <div className={styles.container}>aa</div>
    </main>
    // </HydrateClient>
  );
}
