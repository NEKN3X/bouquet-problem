"use client";

import { Table } from "@mantine/core";
import { api } from "~/trpc/react";

export function FlowersTable() {
  const flowers = api.maintenance.flowers.useQuery();
  const rows = flowers.data?.map((flower) => (
    <Table.Tr key={flower.id}>
      <Table.Td>{flower.code}</Table.Td>
      <Table.Td>{flower.name}</Table.Td>
      <Table.Td>{flower.purchaseUnit}</Table.Td>
      <Table.Td>{flower.deliveryDays}日</Table.Td>
      <Table.Td>{flower.maintainableDays}日</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Table highlightOnHover verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>花コード</Table.Th>
            <Table.Th>花名</Table.Th>
            <Table.Th>購入単位</Table.Th>
            <Table.Th>発注リードタイム</Table.Th>
            <Table.Th>品質維持可能日数</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
