/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createLogger, format, transports, type Logger as WinstonLogger } from 'winston'
import { VError } from 'verror'

/**
 * Logger class providing a centralized logging system based on Winston.
 * It allows logging of messages and exceptions with support for custom labels
 * and error stack traces. It follows the singleton pattern to ensure consistent
 * logging throughout the application.
 */
class Logger {
  private readonly logger: WinstonLogger
  static instance: Logger

  /**
   * Initializes a new Logger instance with specified transports and formatting.
   * Private constructor to prevent direct construction calls with the `new` operator.
   */
  public constructor () {
    this.logger = Logger.initLogger()
  }

  /**
   * Gets the singleton instance of the Logger.
   * @returns {Logger} The singleton Logger instance.
   */
  public static getInstance (): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  /**
   * Creates and configures the Winston logger with custom format and transports.
   * @returns {WinstonLogger} The configured Winston Logger instance.
   */
  private static initLogger (): WinstonLogger {
    const logFormat = format.printf(({ timestamp, level, message, stack, label }) => {
      const logLabel = label ? `[${label.file} - ${label.reason}]` : ''
      const logMessage = stack ? `\n ${stack}` : message
      return `${timestamp} ${level}: ${logLabel} ${logMessage}`
    })

    const timestamplog = format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })

    return createLogger({
      transports: [
        new transports.File({
          filename: 'infos.log',
          level: 'info',
          format: format.combine(
            timestamplog,
            format.errors({ stack: true }),
            logFormat
          )
        }),
        new transports.File({
          filename: 'errors.log',
          level: 'error',
          format: format.combine(
            timestamplog,
            format.errors({ stack: true }),
            logFormat
          )
        })
      ]
    })
  }

  /**
   * Logs a message at the given level with an optional label.
   * @param {string} level - The level at which to log the message.
   * @param {string} message - The message to log.
   * @param {{ file: string, reason: string }} label - An optional label to provide context.
   */
  public log (level: string, message: string, label: { file: string, reason: string }): void {
    this.logger.log({ level, message, label })
  }

  /**
   * Logs an exception with a custom label and error stack if available.
   * If the exception is an instance of VError, additional information will be logged.
   * @param {Error} exc - The exception to log.
   * @param {{ file: string, reason: string }} label - The label providing context for the exception.
   */
  public logException (exc: Error, label: { file: string, reason: string }): void {
    let errorMessage = exc.message

    if (exc instanceof VError) {
      const vErrorMessage = VError.info(exc).errorMessage
      if (vErrorMessage) {
        errorMessage = vErrorMessage
      }

      const cause = VError.cause(exc)
      if (cause) {
        errorMessage += ` | Caused by: ${cause.message}`// Append cause message
      }
    }

    const stack = exc.stack
    this.logger.log({
      level: 'error',
      message: errorMessage,
      label,
      stack
    })

    if (exc instanceof VError) {
      const info = VError.info(exc)
      if (Object.keys(info).length !== 0) {
        errorMessage += ` | Info: ${JSON.stringify(info)}`
      }
    }
  }
}

export default Logger.getInstance()
