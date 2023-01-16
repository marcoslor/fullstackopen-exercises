const Blog = require("../models/Blog");
const User = require("../models/User");

const testingRouter = require("express").Router();

testingRouter.post("/reset", async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  response.status(204).end();
});

module.exports = testingRouter;
