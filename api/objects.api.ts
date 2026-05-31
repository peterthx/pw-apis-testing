import { APIRequestContext } from "@playwright/test";

export interface DataResponse {
  id: string;
  name: string;
  data: {
    color: string;
    [key: string]: any;
  };
}

export class ObjectsApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getObjectById(id: string) {
    const response = await this.request.get(`/objects/${id}`);
    return response;
  }
}
