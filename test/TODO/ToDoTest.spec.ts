import dotenv from "dotenv";
dotenv.config();
import sinon from "sinon";
import chai from "chai";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import { faker } from "@faker-js/faker";
const assert = require("assert");
import "mocha";
import sinonStubPromise from "sinon-stub-promise";
import app from "../../src/app";
const { Todo } = require("../../src/database/entity/Todo");
const { User } = require("../../src/database/entity/User");
import { before } from "mocha";
import userService from "../../src/service/userService";

function generateUserToken() {
  // generate a unique user token here
  return Promise.resolve("unique_token");
}

chai.use(chaiHttp);
sinonStubPromise(sinon);
const expect = chai.expect;
describe("Login API", () => {
  let server;
  let userSaveStub;
  let authToken;

  before(async () => {
    const user = {
      id: faker.datatype.number(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };

    const userId = user.id;
    const email = user.email;
    authToken = jwt.sign({ userId, email }, "secret");
  });

  describe("User", function () {
    it("should return a valid authentication token", () => {
      expect(authToken).to.be.a("string");
    });
  });
  describe("TODO", async () => {
    describe("POST /api/v1/todo", () => {
      it("should create a new todo", async () => {
        const todoSaveStub = sinon.stub(Todo, "save");
        todoSaveStub.resolves({
          title: "New Todo",
          id: "abcd1234",
        });
        todoSaveStub.restore(); // Clean up the stub

        const res = await chai
          .request(app)
          .post("/api/v1/todo")
          .set("Authorization", `Bearer ${authToken}`)
          .send({ id: "abcd1234", title: "New Todo" });

        expect(res).to.have.status(200);
        expect(res.body.title).to.equal("New Todo");

        const todo = await Todo.findOne({ id: "abcd1234" });
        expect(todo).to.exist;
        expect(todo.title).to.equal("New Todo");
      });
    });
    describe("GET All Todo /api/v1/todo/", () => {
      it("should return an empty array if there are no todo's", async () => {
        const todoFindStub = sinon.stub(Todo, "find").resolves([]);
        todoFindStub.restore();

        const res = await chai
          .request(app)
          .get("/api/v1/todo/")
          .set("Authorization", `Bearer ${authToken}`);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array").that.is.empty;
      });

      it("should return all todo's", async () => {
        const todoFindStub = sinon.stub(Todo, "find");
        todoFindStub.resolves([{ title: "Todo 1" }, { title: "Todo 2" }]);
        todoFindStub.restore(); // Clean up the stub
        const res = await chai
          .request(app)
          .get("/api/v1/todo/")
          .set("Authorization", `Bearer ${authToken}`);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array").that.has.lengthOf(2);
        expect(res.body[0].title).to.equal("Todo 1");
        expect(res.body[1].title).to.equal("Todo 2");
      });
    });
    describe("GET One Todo /api/v1/todo/:id", () => {
      it("should return a todo by id", async () => {
        const todoFindOneStub = sinon.stub(Todo, "findOne");
        todoFindOneStub.withArgs({ id: "abcd1234" }).resolves({
          id: "abcd1234",
          title: "Test Todo",
        });

        todoFindOneStub.restore(); // Clean up the stub

        const res = await chai
          .request(app)
          .get("/api/v1/todo/abcd1234")
          .set("Authorization", `Bearer ${authToken}`);

        expect(res).to.have.status(200);
        expect(res.body.title).to.equal("Test Todo");
      });

      it("should return a 404 error if todo is not found", async () => {
        const todoFindOneStub = sinon.stub(Todo, "findOne");
        todoFindOneStub.withArgs({ id: "nonexistent_id" }).resolves(null);
        todoFindOneStub.restore();
        const res = await chai
          .request(app)
          .get("/api/v1/todo/nonexistent_id")
          .set("Authorization", `Bearer ${authToken}`);

        expect(res).to.have.status(404);
      });
    });
    describe("Update Todo /api/v1/todo/:id", () => {
      it("should update a todo", async () => {
        // Create a new todo to update
        const newTodo = new Todo({
          title: "New Todo",
        });
        await newTodo.save();

        // Create a stub for the update method
        const todoUpdateStub = sinon.stub(Todo, "update");
        todoUpdateStub.resolves({});
        todoUpdateStub.restore(); // Clean up the stub

        // Make the PATCH request to update the todo
        const res = await chai
          .request(app)
          .patch(`/api/v1/todo/${newTodo.id}`)
          .set("Authorization", `Bearer ${authToken}`)
          .send({ title: "Updated Todo" });

        // Assertions
        expect(res).to.have.status(200);
        expect(res.body.title).to.equal("Updated Todo");

        const updatedTodo = await Todo.findOne({ id: newTodo.id });
        expect(updatedTodo).to.exist;
        expect(updatedTodo.title).to.equal("Updated Todo");
      });

      it("should return a 404 error if the todo doesn't exist", async () => {
        // Create a stub for the update method
        const todoUpdateStub = sinon.stub(Todo, "update");
        todoUpdateStub.resolves({});
        todoUpdateStub.restore(); // Clean up the stub
        // Make the PATCH request to update a non-existent todo
        const res = await chai
          .request(app)
          .patch("/api/v1/todo/12345")
          .set("Authorization", `Bearer ${authToken}`)
          .send({ title: "Updated Todo" });

        // Assertions
        expect(res).to.have.status(404);
      });
    });
  });
});
