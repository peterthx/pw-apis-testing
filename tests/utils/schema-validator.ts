import { z } from "zod";

export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Schema validation failed: ${JSON.stringify(result.error.format(), null, 2)}`,
    );
  }
  return result.data;
}
