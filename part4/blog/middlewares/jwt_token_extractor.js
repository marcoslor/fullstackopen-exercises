const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const JWTTokenExtractor = (req, res, next) => {
  req.token = getTokenFrom(req);

  next();
};

module.exports = JWTTokenExtractor;