"use client";

import { Button, Center, Group, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useMemo } from "react";
import { CreateFlowerInput } from "~/server/context/maintenance/api-schema";
import { api } from "~/trpc/react";

export function CreateFlowerForm() {
  const queryClient = useQueryClient();
  const flowersQueryKey = getQueryKey(api.maintenance.flowers);
  const createFlower = api.maintenance.createFlower.useMutation({
    onSuccess: () => queryClient.invalidateQueries({ queryKey: flowersQueryKey }),
  });
  const form = useForm({
    initialValues: {
      code: "",
      name: "",
      purchaseUnit: 0,
      deliveryDays: 0,
      maintainableDays: 0,
    },
    validate: zodResolver(CreateFlowerInput),
  });
  const resetForm = useMemo(() => form.reset, [form]);
  const errorMessage = useMemo(() => createFlower.error?.message, [createFlower.error?.message]);
  const createdFlowerData = useMemo(() => createFlower.data, [createFlower.data]);

  useEffect(() => {
    if (createFlower.status === "success") {
      notifications.show({
        title: "花を登録しました",
        message: `花コード: ${createdFlowerData?.code}`,
        color: "green",
      });
    }
    if (createFlower.status === "error") {
      notifications.show({
        title: "花の登録に失敗しました",
        message: errorMessage,
        color: "red",
      });
    }
  }, [createFlower.status, createdFlowerData, errorMessage, resetForm]);

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => {
          form.validate();
          if (form.isValid()) {
            createFlower.mutate(values);
          }
        })}
      >
        <Stack gap="sm">
          <TextInput withAsterisk label="コード" placeholder="HN0001" {...form.getInputProps("code")} />
          <TextInput withAsterisk label="名前" placeholder="バラ" {...form.getInputProps("name")} />
          <NumberInput withAsterisk label="購入単位" placeholder="10" {...form.getInputProps("purchaseUnit")} />
          <NumberInput withAsterisk label="発注リードタイム" placeholder="1" {...form.getInputProps("deliveryDays")} />
          <NumberInput
            withAsterisk
            label="品質維持可能日数"
            placeholder="1"
            {...form.getInputProps("maintainableDays")}
          />

          <Group justify="flex-end" mt="sm">
            <Button type="submit" disabled={createFlower.isPending}>
              登録する
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}

export function CreateFlowerFormModalButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="花を登録する" centered>
        <CreateFlowerForm />
      </Modal>
      <Center>
        <Button size="compact-sm" onClick={open} leftSection={<IconPlus size={14} />}>
          花を登録する
        </Button>
      </Center>
    </>
  );
}
