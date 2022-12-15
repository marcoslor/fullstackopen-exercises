const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({
      error: "malformatted id",
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "APIError" || error.name === "ValidationError") {
    return response.status(error.status).json({
      error: error.message,
    });
  } else {
    console.log("unknown error");
    return response.status(500).json({
      error: "unknown error",
    });
  }
};

module.exports = errorHandler;