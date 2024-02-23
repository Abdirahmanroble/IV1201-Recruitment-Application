import { Request, Response, NextFunction, Application } from "express"
import Logger from "../util/Logger"
import { ValidationError } from "sequelize"

/**
 * ErrorHandling class for managing application-wide error handling in an Express application.
 * It utilizes a Logger instance to log exceptions and provides a middleware to handle errors
 * by sending a standardized response or passing the error along if the response headers have already been sent.
 */
class ErrorHandling {
  /**
   * Logger instance for logging exceptions.
   * @private
   */
  private logger: Logger

  /**
   * Initializes a new instance of the ErrorHandling class.
   * Constructs a new Logger instance for use in error handling.
   */
  constructor() {
    this.logger = new Logger()
  }

  /**
   * Error handling middleware function.
   * Logs the received error using the Logger instance, checks if response headers have already been sent,
   * and either passes the error to the next error handling middleware or sends a 500 status response.
   *
   * @param err - The error object that was caught.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function to pass control to the next middleware.
   * @returns {void}
   */
  public handleError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    this.logger.logException(err)

    if (res.headersSent) {
      return next(err)
    }

    // res.status(500).send({ error: "Operation failed." })

    const status = err instanceof ValidationError ? 400 : 500;
    const message = err.message || 'An unexpected error occurred';

    this.sendHttpResponse(res, status, message);
  }

  /**
   * Registers the error handling middleware within the Express application.
   * This method should be called to add the error handling middleware to the application's middleware stack.
   *
   * @param app - The Express Application instance to which the error handling middleware will be registered.
   * @returns {void}
   */
  public register(app: Application): void {
    app.use((err: any, req: Request, res: Response, next: NextFunction) =>
      this.handleError(err, req, res, next)
    )
  }

  /**
   * Sends an HTTP response with a given status code and body. Formats the response
   * as a JSON object with either a "success" or "error" key depending on the status code.
   *
   * @param res - The response object.
   * @param status - The HTTP status code for the response.
   * @param body - The response body content. If undefined, sends an empty response.
   */
  private sendHttpResponse(res: Response, status: number, body?: string): void {
    // Assuming Validators.isIntegerBetween is a method that throws an error if the validation fails
    // Validators.isIntegerBetween(status, 200, 501);

    if (body === undefined) {
      res.status(status).end()
      return
    }

    const key = status < 400 ? "success" : "error"
    res.status(status).json({ [key]: body })
  }
}

export default ErrorHandling
