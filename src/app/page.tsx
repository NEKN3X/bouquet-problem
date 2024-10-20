import { Container, NavLink, Stack } from "@mantine/core";
import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main style={{ position: "relative", zIndex: 1 }}>
        <Container size={"xs"}>
          <Stack>
            <NavLink label="アドミン" href="/admin" />
          </Stack>
        </Container>
      </main>
    </HydrateClient>
  );
}
