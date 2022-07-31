module.exports = class ApiError extends Error {

  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unAuthorizedError() {
    return new ApiError(401, "You do not have sufficient rights or are not authorized");

  }
  static badRequestError(message, errors = []) {
    return new ApiError(400, message, errors);
  }

}