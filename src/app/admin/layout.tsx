import { Container, Divider } from "@mantine/core";
import { HydrateClient } from "~/trpc/server";
import { Breadcrumbs } from "../_components/breadcrumbs";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <HydrateClient>
      <main style={{ position: "relative", zIndex: 1 }}>
        <Container size={"xs"} pt={"xs"}>
          <Breadcrumbs />
          <Divider my={"xs"} />
          {children}
        </Container>
      </main>
    </HydrateClient>
  );
}
