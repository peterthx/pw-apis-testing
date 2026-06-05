import { APIRequestContext } from "@playwright/test";
import { z } from "zod";

export const ObjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  data: z
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
    .nullable()
    .optional(),
});

export type ObjectType = z.infer<typeof ObjectSchema>;

export class ObjectsApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getObjects() {
    return await this.request.get("/objects");
  }

  async getObjectById(id: string) {
    return await this.request.get(`/objects/${id}`);
  }

  async addObject(data: any) {
    return await this.request.post("/objects", {
      data,
    });
  }

  async updateObject(id: string, data: any) {
    return await this.request.put(`/objects/${id}`, {
      data,
    });
  }

  async deleteObject(id: string) {
    return await this.request.delete(`/objects/${id}`);
  }
}
