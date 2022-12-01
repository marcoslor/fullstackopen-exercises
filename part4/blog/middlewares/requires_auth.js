const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const APIError = require("../utils/api_error");
const User = require("../models/user");

const requiresAuth = async (req, res, next) => {
  if (!req.token) {
    throw new APIError("token missing or invalid", 401);
  }

  const token = jwt.verify(req.token, config.SECRET);

  if (!token?.id) {
    throw new APIError("token missing or invalid", 401);
  }

  req.user = await User.findById(token.id);
  
  next();
};

module.exports = requiresAuth;