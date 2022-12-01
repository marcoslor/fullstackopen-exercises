const User = require("../models/user");
const { createUser } = require("../utils/model_factory");

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

const populateUsers = async () => {
  await User.deleteMany({});
  return await Promise.all(
    Array(2).fill().map(() => createUser())
  );
};

module.exports = {
  usersInDb,
  populateUsers,
};