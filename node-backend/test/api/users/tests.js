process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
require("dotenv").config();

const { assert, should, expect } = chai;
const app = require("../../../app.js");

describe("Users API Test Cases", () => {
  it("GET /users --> array of users", async () => {
    const res = await chai.request(process.env.NODE_ENV_PORT).get("/users");
    expect(res.status).to.equal(200);

    const users = res.body.data.users;
    expect(Array.isArray(users));

    const user = users[0];
    expect(user).to.contain.property("_id");
    expect(user).to.contain.property("name");
    expect(user).to.contain.property("email");
    expect(user).to.contain.property("role");
    expect(user).to.contain.property("date");
  });

  it("POST /users --> validates input name (min of 6 characters) for create user", async () => {
    const params = {
      name: "Test",
      email: "textemail@mail.com",
      role: "Admin",
    };

    const res = await chai
      .request(process.env.NODE_ENV_PORT)
      .post("/users")
      .send(params);

    expect(res.status).to.equal(400);
    expect(res.body).to.contain.property("status");
    expect(res.body).to.contain.property("message");
    expect(res.body).to.contain.property("data");
    expect(res.body.status).to.equal(false);
  });

  it("POST /users --> validates invalid email for create user", async () => {
    const params = {
      name: "Test User",
      email: "t@mail.coms",
      role: "Admin",
    };

    const res = await chai
      .request(process.env.NODE_ENV_PORT)
      .post("/users")
      .send(params);

    expect(res.status).to.equal(400);
    expect(res.body).to.contain.property("status");
    expect(res.body).to.contain.property("message");
    expect(res.body).to.contain.property("data");
    expect(res.body.status).to.equal(false);
  });

  it("POST /users --> validates email already exits for create user", async () => {
    const params = {
      name: "Test User",
      email: "testuser@mail.com",
      role: "Admin",
    };

    const res = await chai
      .request(process.env.NODE_ENV_PORT)
      .post("/users")
      .send(params);

    expect(res.status).to.equal(400);
    expect(res.body).to.contain.property("status");
    expect(res.body).to.contain.property("message");
    expect(res.body).to.contain.property("data");
    expect(res.body.status).to.equal(false);
  });

  it("POST /users --> creates a new user", async () => {
    const params = {
      name: "Test User",
      email: `${Math.random().toString(36).substring(7)}@mail.com`,
      role: "Admin",
    };

    const res = await chai
      .request(process.env.NODE_ENV_PORT)
      .post("/users")
      .send(params);

    expect(res.status).to.equal(201);

    const user = res.body.data.user;
    expect(user).to.contain.property("_id");
    expect(user).to.contain.property("name");
    expect(user).to.contain.property("email");
    expect(user).to.contain.property("role");
    expect(user).to.contain.property("date");
  });

  it("PUT /users/id --> updates a specific user", async () => {
    const params = {
      name: "Test User",
      email: "testuser@mail.com",
      role: "Admin",
    };

    const res = await chai
      .request(process.env.NODE_ENV_PORT)
      .put("/users/60efcc3e41b54f45ecebed05")
      .send(params);

    expect(res.status).to.equal(202);

    const user = res.body.data;
    expect(user).to.contain.property("_id");
    expect(user).to.contain.property("name");
    expect(user).to.contain.property("email");
    expect(user).to.contain.property("role");
    expect(user).to.contain.property("date");
  });

  // it("DELETE /users/id --> deletes a specific user", async () => {});
  //it("PUT /users/id --> validates request body for update user", async () => {});
  //it("GET /users/id --> 404 if not found", async () => {});
});
