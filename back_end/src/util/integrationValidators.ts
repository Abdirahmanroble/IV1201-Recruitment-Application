/* eslint-disable */
import validator from 'validator'

class IntegrationValidators {
  /**
     * Validates login data, ensuring both username and password are provided.
     * Username must not start with a number and must be either a valid email or an alphanumeric string.
     * @param {object} data - Contains username and password to be validated.
     * @returns {Promise<object>} A promise resolving to an object indicating validation success or error details.
     */
  static async validateLoginData (data: {
    username?: string
    password?: string
  }): Promise<{
      isValid: boolean
      error?: { errorCode: number, message: string, status: number }
    }> {
    const { username, password } = data

    if (!username && !password) {
      return {
        isValid: false,
        error: {
          errorCode: 101,
          message: 'The username and/or the password are missing.',
          status: 400
        }
      }
    }

    if (username && /^[0-9].*/.test(username)) {
      return {
        isValid: false,
        error: {
          errorCode: 102,
          message: 'Username must not start with a number',
          status: 400
        }
      }
    }

    if (username) {
      if (
        validator.isEmpty(username) ||
        (!validator.isEmail(username) && !validator.isAlphanumeric(username))
      ) {
        return {
          isValid: false,
          error: {
            errorCode: 103,
            message:
              'Username must be a valid email or an alphanumeric username.',
            status: 400
          }
        }
      }
    }
    return { isValid: true, error: { errorCode: 0, message: '', status: 200 } }
  }

  /**
 * Validates email format using a simple method.
 * @param {object} data - Contains the email to be validated.
 * @returns {Promise<object>} A promise resolving to an object indicating validation success or error details.
 */
  static async validateEmail (data: { email?: string }): Promise<{
    isValid: boolean
    error?: { message: string, status: number }
  }> {
    if (data.email && !validator.isEmail(data.email)) {
      return {
        isValid: false,
        error: { message: 'Invalid email format.', status: 400 }
      }
    }

    return { isValid: true, error: { message: '', status: 200 } }
  }

  /**
 * Validates registration data, including checks for username length, password length,
 * numerical PNR without decimals, and proper email format.
 * @param {object} data - Contains user registration data to be validated.
 * @returns {Promise<object>} A promise resolving to an object indicating validation success or error details.
 */
  static async validateRegistrationData (data: {
    name: string
    surname: string
    pnr: string
    email: string
    username: string
    password: string
  }): Promise<{
      isValid: boolean
      error?: { errorCode: number, message: string, status: number }
    }> {
    const { name, surname, pnr, email, username, password } = data

    // Validate username length
    if (!username || username.length < 3) {
      return {
        isValid: false,
        error: {
          errorCode: 201,
          message: 'Username must be at least 3 characters long.',
          status: 400
        }
      }
    }

    // Validate password length
    if (!password || password.length < 6) {
      return {
        isValid: false,
        error: {
          errorCode: 202,
          message: 'Password must be at least 6 characters long.',
          status: 400
        }
      }
    }

    // Validate PNR is a number and does not include decimals
    if (isNaN(Number(pnr)) || pnr.includes('.')) {
      return {
        isValid: false,
        error: {
          errorCode: 203,
          message: 'PNR must be a number.',
          status: 400
        }
      }
    }

    // Validate email format
    if (!email.includes('@') || !email.includes('.')) {
      return {
        isValid: false,
        error: {
          errorCode: 204,
          message: 'Please enter a valid email address.',
          status: 400
        }
      }
    }

    return { isValid: true, error: { errorCode: 0, message: '', status: 200 } }
  }

  /**
 * Validates application data, including user data, competences, and availability.
 * Ensures none of these are missing, user ID is valid, competences are provided as a non-empty array,
 * and years of experience are not negative.
 * @param {object} data - Contains application data including user data, competences, and availability.
 * @returns {Promise<object>} A promise resolving to an object indicating validation success or error details.
 */
  static async validateApplicationData (data: {
    userData: {
      person_id?: number
    }
    competences: Array<{
      yearsOfExperience: number
    }>
    availability: any // Replace `any` with the appropriate type
  }): Promise<{
      isValid: boolean
      error?: { errorCode: number, message: string, status: number }
    }> {
    const { userData, competences, availability } = data

    if (!userData || !competences || !availability) {
      return {
        isValid: false,
        error: {
          errorCode: 301,
          message: 'User data, competences, and availability are required.',
          status: 400
        }
      }
    }

    if (!userData.person_id) {
      return {
        isValid: false,
        error: {
          errorCode: 302,
          message: 'A valid user ID is required.',
          status: 400
        }
      }
    }

    if (!Array.isArray(competences) || competences.length === 0) {
      return {
        isValid: false,
        error: {
          errorCode: 303,
          message: 'Competences must be a non-empty array.',
          status: 400
        }
      }
    }

    const hasNegativeExperience = competences.some(competence => competence.yearsOfExperience < 0)
    if (hasNegativeExperience) {
      return {
        isValid: false,
        error: {
          errorCode: 304,
          message: 'Years of experience cannot be negative.',
          status: 400
        }
      }
    }

    return { isValid: true, error: { errorCode: 0, message: '', status: 200 } }
  }

  /**
 * Validates user update request data, including the presence of a token and a new password of sufficient length.
 * @param {string} token - The token to be validated.
 * @param {string} newPassword - The new password to be validated for length.
 * @returns {object} An object indicating validation success or error details.
 */
  static validateUpdateUserRequest (token: string, newPassword: string): {
    isValid: boolean
    message?: string
  } {
    if (!token) {
      return { isValid: false, message: 'Token is required for updating user.' }
    }

    if (!newPassword || newPassword.length < 6) {
      return {
        isValid: false,
        message: 'New password must be at least 6 characters long.'
      }
    }

    return { isValid: true }
  }

  /**
 * Validates the format of an email for user retrieval operations, ensuring it's a properly formatted email.
 * @param {string} email - The email address to be validated.
 * @returns {object} An object indicating validation success or error details.
 */
  static validateEmailForUserRetrieval (email: string): {
    isValid: boolean
    message?: string
  } {
    if (!email || !validator.isEmail(email)) {
      return { isValid: false, message: 'A valid email address is required.' }
    }

    return { isValid: true }
  }
}

export default IntegrationValidators
