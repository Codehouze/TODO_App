import dotenv from "dotenv";
dotenv.config();
import * as chai from "chai";
import "chai-http";
const assert = require("assert");
import "mocha";
import { DataSource, Repository } from "typeorm";
import { createConnection, Connection } from "typeorm";
import { IMemoryDb, newDb } from "pg-mem";
import { PostgresDriver } from "typeorm/driver/postgres/PostgresDriver";

import bcrypt from "bcrypt";
import { after, before, beforeEach } from "mocha";
import { init } from "pgtest";

const app = require("../../src/app");
const { Todo } = require("../../src/entity/Todo");
const { User } = require("../../src/entity/User");

chai.use(require("chai-http"));

const expect = chai.expect;

let connection: Connection;

before(async () => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  //==== create a Typeorm connection
  const connection: Connection = await db.adapters.createTypeormConnection({
    type: "postgres",
    entities: [User, Todo],
  });

  PostgresDriver.prototype.= async () => {
    return "test_database";
  };
  console.log(connection);
});
after(async () => {
  await connection.close();
});
// await connection.synchronize();

describe("TODO Endpoints", () => {
  let authToken: string;

  beforeEach(async () => {
    const user = new User();
    user.username = "testuser";
    user.password = await bcrypt.hash("testpassword", 10);
    await user.save();

    // Login to get the authentication token
    const res = await chai
      .request(app)
      .post("/login")
      .send({ username: "testuser", password: "testpassword" });
    authToken = res.body.token;
  });

  afterEach(async () => {
    // Delete all todos and users after each test
    await Todo.delete({});
    await User.delete({});
  });

  describe("GET /todos", () => {
    it("should return an empty array if there are no todos", async () => {
      const res = await chai
        .request(app)
        .get("/todos")
        .set("Authorization", `Bearer ${authToken}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array").that.is.empty;
    });

    it("should return all todos", async () => {
      const todo1 = new Todo();
      todo1.title = "Todo 1";
      await todo1.save();

      const todo2 = new Todo();
      todo2.title = "Todo 2";
      await todo2.save();

      const res = await chai
        .request(app)
        .get("/todos")
        .set("Authorization", `Bearer ${authToken}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array").that.has.lengthOf(2);
      expect(res.body[0].title).to.equal("Todo 1");
      expect(res.body[1].title).to.equal("Todo 2");
    });
  });

  describe("POST /todos", () => {
    it("should create a new todo", async () => {
      const res = await chai
        .request(app)
        .post("/todos")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ title: "New Todo" });
      expect(res).to.have.status(200);
      expect(res.body.title).to.equal("New Todo");
      const todo = await Todo.findOne(res.body.id);
      expect(todo).to.exist;
    });
  });
});
