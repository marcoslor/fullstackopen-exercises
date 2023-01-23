const jwt = require("jsonwebtoken");
const User = require("./models/User");
const { JWT_SECRET } = require("../config");

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null;
  if (!auth || !auth.toLowerCase().startsWith("bearer ")) {
    return { currentUser: null };
  }

  try {
    const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
    if (!decodedToken.id) {
      return { currentUser: null };
    }
    const currentUser = await User.findById(decodedToken.id);
    return { currentUser };
  } catch (error) {
    console.log(error);
  }
  return { currentUser: null };
};

module.exports = context;
