import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure } from "~/server/api/trpc";
import { CreateFlowerInput, FlowerId, UpdateFlowerInput } from "./api-schema";

// 花の一覧を取得する
export const getFlowers = adminProcedure.query(async ({ ctx }) => {
  return await ctx.db.flower.findMany();
});

// 花を取得する
export const getFlower = adminProcedure.input(z.object({ id: FlowerId })).query(async ({ ctx, input }) => {
  const flower = await ctx.db.flower.findUnique({ where: { id: input.id } });
  if (!flower) throw new TRPCError({ code: "BAD_REQUEST", message: "選択した花が見つかりません" });
  return flower;
});

// 花を登録する
export const createFlower = adminProcedure.input(CreateFlowerInput).mutation(async ({ ctx, input }) => {
  const flower = await ctx.db.flower.create({ data: input });
  return flower;
});

// 花を更新する
export const updateFlower = adminProcedure.input(UpdateFlowerInput).mutation(async ({ ctx, input }) => {
  const flower = await ctx.db.flower.update({ where: { id: input.id }, data: input });
  return flower;
});
