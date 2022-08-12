/**
 * Class to define a standard error that can be used by the normal AppError handler
 */
export default class AppError extends Error {
  /**
   *
   * @param message string: A user friendly description of the error.
   * @param statusCode number: The error's HTTP status code, if provided.
   * @param extraData object: All error details for reporting purposes.
   * @param techMessage string: A technical user friendly description of the error for reporting purposes.
   */
  constructor(
    message,
    statusCode = null,
    extraData = null,
    techMessage = null
  ) {
    super();
    this.message = message;
    if (statusCode && !isNaN(statusCode)) {
      this.statusCode = parseInt(statusCode, 10);
    } else {
      this.statusCode = null;
    }
    if (extraData && extraData !== null) {
      this.extraData = extraData;
    }
    this.techMessage = techMessage ? techMessage : "";
  }
}
