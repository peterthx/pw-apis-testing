import { test, expect } from "./fixtures/api-fixtures";
import { ObjectSchema } from "../api/objects.api";
import { validateSchema } from "./utils/schema-validator";

test.describe("RESTful API Objects", () => {
  test("GET object by ID 3 success", async ({ objectsApi }) => {
    const response = await objectsApi.getObjectById("3");
    expect(response).toBeOK();

    const resBody = await response.json();

    // Validate schema
    validateSchema(ObjectSchema, resBody);

    expect(resBody.id).toBe("3");
    expect(resBody.name).toBe("Apple iPhone 12 Pro Max");
    expect(resBody.data).toEqual({
      color: "Cloudy White",
      "capacity GB": 512,
    });
  });

  test("Add and delete a new object", async ({ objectsApi }) => {
    const newObject = {
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

    const createdObject = await postResponse.json();
    expect(createdObject.id).toBeDefined();
    expect(createdObject.name).toBe(newObject.name);

    // Delete object
    const deleteResponse = await objectsApi.deleteObject(createdObject.id);
    expect(deleteResponse).toBeOK();
    
    const deleteBody = await deleteResponse.json();
    expect(deleteBody.message).toContain("has been deleted");
  });
});
