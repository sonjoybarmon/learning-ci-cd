const request = require("supertest");

const { expect } = require("chai");

const app = require("../app");

describe("GET /", () => {
  it('should respond with "Hello, World!"', async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).to.equal(200);

    expect(response.text).to.equal("Hello, World!");
  });
});
