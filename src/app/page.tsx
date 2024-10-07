import { LatestPost } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import styles from "./index.module.css";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className={styles.main}>
        <div className={styles.container}>
          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}
