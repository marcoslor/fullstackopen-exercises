const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.SECRET || "SECRET TOKEN";
const GRAPHQL_PATH = "/graphql";
const WS_PATH = "/socket";
const PORT = process.env.PORT || 4000;

module.exports = {
  MONGODB_URI,
  JWT_SECRET,
  GRAPHQL_PATH,
  PORT,
  WS_PATH,
};