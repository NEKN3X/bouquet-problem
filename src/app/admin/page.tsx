import { NavLink, Stack, Title } from "@mantine/core";
import { IconChevronRight, IconLink } from "@tabler/icons-react";
import { getServerAuthSession } from "~/server/auth";

export default async function AdminPage() {
  const session = await getServerAuthSession();

  return (
    <Stack gap={"xs"}>
      <Title>Admin</Title>
      <Title order={3}>ナビゲーション</Title>
      <Stack gap={0}>
        <NavLink
          label="メンテナンス"
          href="/admin/maintenance"
          leftSection={<IconLink size="1rem" stroke={1.5} />}
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
          variant="subtle"
          active
        />
        <NavLink
          label="花の発注"
          href="/admin/purchase"
          leftSection={<IconLink size="1rem" stroke={1.5} />}
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
          variant="subtle"
          active
        />
        <NavLink
          label="花束の注文"
          href="/"
          leftSection={<IconLink size="1rem" stroke={1.5} />}
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
          variant="subtle"
          active
        />
      </Stack>
    </Stack>
  );
}
