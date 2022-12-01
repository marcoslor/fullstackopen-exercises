class APIError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

module.exports = APIError;