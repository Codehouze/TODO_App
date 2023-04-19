import dotenv from "dotenv";
dotenv.config();
import sinon from "sinon";
import chai from "chai";
import chaiHttp from "chai-http";
const assert = require("assert");
import "mocha";

import bcrypt from "bcrypt";
import { after, before, beforeEach } from "mocha";

const app = require("../../src/app");
const { Todo } = require("../../src/database/entity/Todo");
const { User } = require("../../src/database/entity/User");

chai.use(chaiHttp);

const expect = chai.expect;

let authToken: string;
describe("TODO Endpoints", () => {
  // let authToken: string;
  console.log(app);
  before(async () => {
    const userSaveStub = sinon.stub(User.prototype, "save");
    userSaveStub.resolves({});

    // Login to get the authentication token
    const res = await chai
      .request(app)
      .post("/api/v1/user/login")
      .send({ username: "testuser", password: "testpassword" });
    authToken = res.body.token;
  });

  after(async () => {
    // Delete all todos and users after each test
    sinon.restore();
  });
  describe("POST /api/v1/todo", () => {
    it("should create a new todo", async () => {
      const todoSaveStub = sinon.stub(Todo.prototype, "save");
      todoSaveStub.resolves({
        title: "New Todo",
        id: "abcd1234",
      });

      const res = await chai
        .request(app)
        .post("/api/v1/todo")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ title: "New Todo" });

      expect(res).to.have.status(200);
      expect(res.body.title).to.equal("New Todo");

      const todo = await Todo.findOne({ id: "abcd1234" });
      expect(todo).to.exist;
      expect(todo.title).to.equal("New Todo");

      todoSaveStub.restore(); // Clean up the stub
    });
  });
  describe("GET /api/v1/todo/", () => {
    it("should return an empty array if there are no todo's", async () => {
      // Arrange
      sinon.stub(Todo, "find").resolves([]);

      // Act
      const res = await chai
        .request(app)
        .get("/api/v1/todo/")
        .set("Authorization", `Bearer ${authToken}`);
      console.log(res);
      // Assert
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.be.an("array").that.is.empty;

      // Clean up
      sinon.restore();
    });

    it("should return all todo's", async () => {
      const todoFindStub = sinon.stub(Todo, "find");
      todoFindStub.resolves([{ title: "Todo 1" }, { title: "Todo 2" }]);

      const res = await chai
        .request(app)
        .get("/api/v1/todo/")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array").that.has.lengthOf(2);
      expect(res.body[0].title).to.equal("Todo 1");
      expect(res.body[1].title).to.equal("Todo 2");

      todoFindStub.restore(); // Clean up the stub
    });
  });
  describe("GET /api/v1/todo/:id", () => {
    it("should return a todo by id", async () => {
      const todoFindOneStub = sinon.stub(Todo, "findOne");
      todoFindOneStub.withArgs({ id: "abcd1234" }).resolves({
        id: "abcd1234",
        title: "Test Todo",
      });

      const res = await chai
        .request(app)
        .get("/api/v1/todo/abcd1234")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res).to.have.status(200);
      expect(res.body.title).to.equal("Test Todo");

      todoFindOneStub.restore(); // Clean up the stub
    });

    it("should return a 404 error if todo is not found", async () => {
      const todoFindOneStub = sinon.stub(Todo, "findOne");
      todoFindOneStub.withArgs({ id: "nonexistent_id" }).resolves(null);

      const res = await chai
        .request(app)
        .get("/api/v1/todo/nonexistent_id")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res).to.have.status(404);

      todoFindOneStub.restore(); // Clean up the stub
    });
  });
  describe("PATCH /api/v1/todo/:id", () => {
    it("should update a todo", async () => {
      // Create a new todo to update
      const newTodo = new Todo({
        title: "New Todo",
      });
      await newTodo.save();

      // Create a stub for the update method
      const todoUpdateStub = sinon.stub(Todo, "update");
      todoUpdateStub.resolves({});

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

      todoUpdateStub.restore(); // Clean up the stub
    });

    it("should return a 404 error if the todo doesn't exist", async () => {
      // Create a stub for the update method
      const todoUpdateStub = sinon.stub(Todo, "update");
      todoUpdateStub.resolves({});

      // Make the PATCH request to update a non-existent todo
      const res = await chai
        .request(app)
        .patch("/api/v1/todo/12345")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ title: "Updated Todo" });

      // Assertions
      expect(res).to.have.status(404);

      todoUpdateStub.restore(); // Clean up the stub
    });
  });
});
