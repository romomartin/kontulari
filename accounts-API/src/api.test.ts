import request from "supertest";
import { api } from "./api";

describe("Accounts API", () => {
  it("Gives API info in root path", async () => {
    const response = await request(api).get("/");

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Kontulari accounts API");
  });
});
