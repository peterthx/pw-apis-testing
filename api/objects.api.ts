import type { APIRequestContext } from "@playwright/test";
import { z } from "zod";

const ObjectDataSchema = z
  .object({
    color: z.string().optional(),
    "capacity GB": z.number().optional(),
    capacity: z.number().optional(),
    price: z.number().optional(),
    generation: z.string().optional(),
    year: z.number().optional(),
    CPU: z.string().optional(),
    "Hard disk size": z.string().optional(),
  })
  .nullable();

export const ObjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  data: ObjectDataSchema.optional(),
});

export type ObjectType = z.infer<typeof ObjectSchema>;
export type NewObject = Omit<ObjectType, "id">;

export class ObjectsApi {
  constructor(private readonly request: APIRequestContext) {}

  async getObjects() {
    return this.request.get("/objects");
  }

  async getObjectById(id: string) {
    return this.request.get(`/objects/${encodeURIComponent(id)}`);
  }

  async addObject(data: NewObject) {
    return this.request.post("/objects", { data });
  }

  async updateObject(id: string, data: NewObject) {
    return this.request.put(`/objects/${encodeURIComponent(id)}`, { data });
  }

  async deleteObject(id: string) {
    return this.request.delete(`/objects/${encodeURIComponent(id)}`);
  }
}
