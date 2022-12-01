const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const api = supertest(app);

const {createUser} = require("../utils/model_factory");

beforeEach(async () => {
  await helper.populateUsers();
});

describe("user management", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: usersAtStart[0].username,
      name: usersAtStart[0].name,
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

describe("authentication", () => {
  test("login succeeds with correct credentials", async () => {
    const user = { username: "user", password: "password" };
    
    await createUser({
      username: user.username,
      passwordHash: bcrypt.hashSync(user.password, 10),
    });
    
    const result = await api.post("/api/login").send(user).expect(200);
    expect(result.body.token).toBeDefined();
  });
  
});
afterAll(() => {
  mongoose.connection.close();
});