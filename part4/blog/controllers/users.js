const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const APIError = require("../utils/api_error");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password) {
    throw new APIError("password is required");
  }
  if (password.length < 3) {
    throw new APIError("password must be at least 3 characters");
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new APIError("username must be unique");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");  
  response.json(users);
});

module.exports = usersRouter;