import request from "supertest";
import { expect } from "chai";
import app from "../app";

describe("GET /", () => {
  it('should respond with "Hello, World!"', async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).to.equal(200);
    expect(response.text).to.equal("Hello, World!");
  });
});
