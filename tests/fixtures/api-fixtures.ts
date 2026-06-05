import { test as base } from "@playwright/test";
import { ObjectsApi } from "../../api/objects.api";

type MyFixtures = {
  objectsApi: ObjectsApi;
};

export const test = base.extend<MyFixtures>({
  objectsApi: async ({ request }, use) => {
    const objectsApi = new ObjectsApi(request);
    await use(objectsApi);
  },
});

export { expect } from "@playwright/test";
