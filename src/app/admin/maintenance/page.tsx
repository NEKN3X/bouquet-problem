import { Box, Flex, Stack, Title } from "@mantine/core";
import { CreateFlowerFormModalButton } from "../../_components/maintenance/create-flower";
import { FlowersTable } from "../../_components/maintenance/flowers";

export default async function MaintenancePage() {
  return (
    <Stack gap={"xs"}>
      <Title>Maintenance</Title>
      <Box>
        <Flex justify={"space-between"}>
          <Title order={3}>登録済みの花一覧</Title>
          <CreateFlowerFormModalButton />
        </Flex>
        <FlowersTable />
      </Box>
    </Stack>
  );
}
