/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-extraneous-class */

import validator from 'validator'
import { type Request } from 'express'

/**
 * Class containing static methods for validating user-related data.
 * This includes validation for login, registration, and logout operations,
 * leveraging the `validator` library for data validation.
 */
class UserValidators {
  /**
   * Validates the login data, specifically the username and password.
   * Throws an error if the username or password are not provided, or if the
   * username does not meet the criteria of being either a valid email or an alphanumeric string.
   *
   * @param {Object} data - An object containing login information.
   * @param {string} [data.username] - The username or email of the user.
   * @param {string} [data.password] - The password of the user.
   * @throws {Error} If the validation fails.
   */

  static async validateLoginData (data: {
    username?: string
    password?: string
  }): Promise<{ isValid: boolean, error?: { errorCode: number, message: string, status: number } }> {
    // console.log("We are here")
    const { username, password } = data
    if (!username && !password) {
      // console.log("I am here")
      // throw new Error("Please provide either an email/username or a password.")
      return {
        isValid: false,
        error: { errorCode: 101, message: 'Please provide either an email/username or a password.', status: 400 }
      }
    }
    if (username && validator.isEmpty(username)) {
      // throw new Error("Username cannot be empty.")
      return {
        isValid: false,
        error: { errorCode: 102, message: 'Username cannot be empty.', status: 400 }
      }
    }
    if (username) {
      if (
        validator.isEmpty(username) ||
        (!validator.isEmail(username) && !validator.isAlphanumeric(username))
      ) {
        // throw new Error(
        //   "Username must be a valid email or an alphanumeric username."
        // )
        return {
          isValid: false,
          error: { errorCode: 103, message: 'Username must be a valid email or an alphanumeric username.', status: 400 }
        }
      }
    }
    return { isValid: true, error: { errorCode: 104, message: '', status: 200 } }
  }

  /**
   * Validates the registration data including name, surname, username, email,
   * password, and personal number (pnr). Ensures all required fields are present and
   * formats are correct, specifically validating the email and Swedish personal number.
   *
   * @param {Object} data - An object containing registration information.
   * @param {string} data.name - The first name of the user.
   * @param {string} data.surname - The last name of the user.
   * @param {string} data.username - The desired username.
   * @param {string} data.email - The user's email address.
   * @param {string} data.password - The chosen password.
   * @param {string} data.pnr - The Swedish personal number of the user.
   * @throws {Error} If the validation fails.
   */
  static async validateRegistrationData (data: {
    name: string
    surname: string
    username: string
    email: string
    password: string
    pnr: string
  }): Promise<{ isValid: boolean, error?: { errorCode: number, message: string, status: number } }> {
    const { name, surname, username, email, password, pnr } = data

    if (!name || !surname || !username || !email || !password) {
      // throw new Error(
      //   'Name, surname, username, email, and password are required for registration.'
      // )
      return {
        isValid: false,
        error: { errorCode: 201, message: 'Name, surname, username, email, and password are required for registration.', status: 400 }
      }
    }

    this.isNonZeroLengthString(name, 'Name')
    this.isNonZeroLengthString(surname, 'Surname')
    this.isNonZeroLengthString(username, 'Username')
    if (!validator.isEmail(email)) {
      // throw new Error('Invalid email format.')
      return {
        isValid: false,
        error: { errorCode: 202, message: 'Invalid email format.', status: 400 }
      }
    }
    this.isNonZeroLengthString(password, 'Password')
    if (pnr && !this.validateSwedishPersonalNumber(pnr)) {
      // throw new Error(
      //   'Invalid personal number format. Expected format: YYYYMMDD-XXXX.'
      // )
      return {
        isValid: false,
        error: { errorCode: 203, message: 'Invalid personal number format. Expected format: YYYYMMDD-XXXX.', status: 400 }
      }
    }

    return { isValid: true, error: { errorCode: 204, message: '', status: 200 } }
  }

  /**
   * Validates the logout request by checking for a valid authentication cookie.
   * Throws an error if the authentication cookie is missing, indicating an unauthorized logout attempt.
   *
   * @param {Request} req - The Express request object.
   * @throws {Error} If the authentication cookie is missing.
   */
  static async validateLogout (req: Request): Promise<{ isValid: boolean, error?: { errorCode: number, message: string, status: number } }> {
    const authCookie = req.cookies.jwt
    if (!authCookie) {
      // throw new Error('Invalid Token, Unauthorized  access to log out.')
      return {
        isValid: false,
        error: { errorCode: 301, message: 'Invalid Token, Unauthorized access to log out.', status: 400 }
      }
    }
    return { isValid: true, error: { errorCode: 302, message: '', status: 200 } }
  }

  /**
   * Private method to check if a given value is a non-empty string.
   * Intended for internal use within the class to validate string fields.
   *
   * @param {string} value - The value to be checked.
   * @param {string} fieldName - The name of the field, used for error messaging.
   * @throws {Error} If the value is not a non-empty string.
   * @private
   */
  private static isNonZeroLengthString (value: string, fieldName: string): void {
    if (typeof value !== 'string' || validator.isEmpty(value)) {
      throw new Error(`${fieldName} must be a non-empty string.`)
    }
  }

  /**
   * Validates a Swedish personal number against a specific regex pattern.
   * Intended for internal use to validate the format of personal numbers.
   *
   * @param {string} pnr - The Swedish personal number to validate.
   * @returns {boolean} True if the personal number matches the expected format, otherwise false.
   * @private
   */
  private static validateSwedishPersonalNumber (pnr: string): boolean {
    return /^\d{8}-\d{4}$/.test(pnr)
  }

  /**
   * Validates if a given identifier is either a valid email or a non-empty username.
   * This method is currently unused but can be utilized for additional validation scenarios.
   *
   * @param {string} identifier - The identifier to validate.
   * @returns {boolean} True if the identifier is a valid email or a non-empty string, otherwise false.
   * @private
   */
  private static validateAsEmailOrUsername (identifier: string): boolean {
    if (validator.isEmail(identifier)) {
      return true
    }
    return !validator.isEmpty(identifier)
  }
}

export default UserValidators
