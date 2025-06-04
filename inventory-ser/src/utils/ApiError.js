// class ApiError extends Error {
//   constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
//     super(message);
//     this.statusCode = statusCode;
//     this.data = null;
//     this.success = false;
//     this.errors = errors;

//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export { ApiError };

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    // Maintain proper stack trace (only on V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
