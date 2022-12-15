const config = require("../utils/config");
const requiresAuth = require("../middlewares/requires_auth");

const blogsController = require("../controllers/blogs");
const usersController = require("../controllers/users");
const loginController = require("../controllers/login");

const apiRouter = require("express").Router();

apiRouter.use("/blogs", requiresAuth, blogsController);
apiRouter.use("/users", usersController);
apiRouter.use("/login", loginController);

if (config.NODE_ENV === "test") {
  const testingController = require("../controllers/testing");
  apiRouter.use("/testing", testingController);
}

module.exports = apiRouter;