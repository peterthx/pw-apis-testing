import { test, expect } from "./fixtures/api-fixtures";
import { ObjectSchema, type NewObject } from "../api/objects.api";
import { validateSchema } from "./utils/schema-validator";

test.describe("RESTful API Objects", () => {
  test("GET object by ID 3 success", async ({ objectsApi }) => {
    const response = await objectsApi.getObjectById("3");
    expect(response).toBeOK();

    const object = validateSchema(ObjectSchema, await response.json());

    expect(object.id).toBe("3");
    expect(object.name).toBe("Apple iPhone 12 Pro Max");
    expect(object.data).toEqual({
      color: "Cloudy White",
      "capacity GB": 512,
    });

    console.log("GET response status:", response.status);
    console.log("GET response body:", await response.json());
  });

  test("Add and delete a new object", async ({ objectsApi }) => {
    const newObject: NewObject = {
      name: "Apple MacBook Pro 16",
      data: {
        year: 2019,
        price: 1849.99,
        CPU: "Intel Core i9",
        "Hard disk size": "1 TB",
      },
    };

    // Add object
    const postResponse = await objectsApi.addObject(newObject);
    expect(postResponse).toBeOK();
    console.log("POST response status:", postResponse.status);
    console.log("POST response body:", await postResponse.json());

    const createdObject = validateSchema(ObjectSchema, await postResponse.json());
    expect(createdObject.id).toBeTruthy();
    expect(createdObject.name).toBe(newObject.name);

    // Delete object
    const deleteResponse = await objectsApi.deleteObject(createdObject.id);
    expect(deleteResponse).toBeOK();

    const deleteBody = await deleteResponse.json();
    expect(deleteBody.message).toContain("has been deleted");
  });
});
