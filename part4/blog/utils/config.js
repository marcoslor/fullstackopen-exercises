
if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: ".test.env" });
} else {
  require("dotenv").config();
}

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
};

module.exports = config;