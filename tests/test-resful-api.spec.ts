import { test, expect } from "@playwright/test";
import { ObjectsApi } from "../api/objects.api";
import { z } from "zod";

const ObjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  data: z.object({
    color: z.string(),
    "capacity GB": z.number().optional(),
    capacity: z.number().optional(),
    price: z.number().optional(),
    generation: z.string().optional(),
    year: z.number().optional(),
    CPU: z.string().optional(),
    "Hard disk size": z.string().optional(),
  }).nullable().optional(),
});

test("GET Resful apis object 3 success", async ({ request }) => {
  const objectsApi = new ObjectsApi(request);
  const getResful = await objectsApi.getObjectById("3");
  expect(getResful).toBeOK();

  const resBody = await getResful.json();
  
  // Validate schema
  const result = ObjectSchema.safeParse(resBody);
  if (!result.success) {
    throw new Error(`Schema validation failed: ${JSON.stringify(result.error.format(), null, 2)}`);
  }

  expect(resBody.id).toBe("3");
  expect(resBody.name).toBe("Apple iPhone 12 Pro Max");
  expect(resBody.data).toEqual({
    color: "Cloudy White",
    "capacity GB": 512
  });
});
