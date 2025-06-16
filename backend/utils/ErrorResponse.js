class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// const myhttpError = {
//   message: 'Some error occured',
//   statusCode: 400,
// };

// new ErrorResponse("Some error occured", 400)

export default ErrorResponse;
