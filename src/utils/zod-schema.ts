import { z } from "zod";

const checkDate = (date: Date) => !Number.isNaN(date.getTime());

export const DateString = z
  .string()
  .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, { message: "日付はYYYY-MM-DDの形式で入力してください" })
  .refine((arg) => checkDate(new Date(arg)), { message: "有効な日付を入力してください" });
