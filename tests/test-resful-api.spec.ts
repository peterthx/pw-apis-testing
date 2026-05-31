import { test, expect } from "@playwright/test";
import { ObjectsApi, DataResponse } from "../api/objects.api";

test("GET Resful apis object 3 success", async ({ request }) => {
  const objectsApi = new ObjectsApi(request);
  const getResful = await objectsApi.getObjectById("3");
  expect(getResful).toBeOK();

  const resBody = (await getResful.json()) as DataResponse;
  expect(resBody.id).toBe("3");
  expect(resBody.name).toBe("Apple iPhone 12 Pro Max");
  expect(resBody.data).toEqual({
    color: "Cloudy White",
    "capacity GB": 512
  });
});
