
if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: ".test.env" });
} else {
  require("dotenv").config();
}

const config = {
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
};

module.exports = config;