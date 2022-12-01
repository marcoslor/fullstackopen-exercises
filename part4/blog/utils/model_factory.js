const bcrypt = require("bcrypt");
const Blog = require("../models/Blog");
const User = require("../models/User");

const createUser = async (user) => {
  const userWithDefaults = ((user) => {
    const rid = Math.floor(Math.random() * 1e5);
    const def = {
      username: "user_" + rid,
      name: "user " + rid,
      passwordHash: bcrypt.hashSync("password", 10),
    };
    if (!user) {
      return def;
    }
    return { ...def, ...user };
  })(user);

  const newUser = new User(userWithDefaults);
  await newUser.save();
  return newUser;
};

const createBlog = async (blog, user) => {
  const blogWithDefaults = ((blog) => {
    const rid = Math.floor(Math.random() * 1e5);
    const def = {
      title: "title " + rid,
      author: "author " + rid,
      url: "url " + rid,
      likes: Math.floor(Math.random() * 1e2),
      user: user.id,
    };
    if (blog) {
      return { ...def, ...blog };
    }
    return def;
  })(blog);

  const newBlog = new Blog(blogWithDefaults);
  await newBlog.save();
  await newBlog.populate("user", { username: 1, name: 1, id: 1 });
  return newBlog;
};

module.exports = {
  createBlog,
  createUser,
};