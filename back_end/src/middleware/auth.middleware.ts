import jwt from 'jsonwebtoken'

/**
 * The secret word used for token encryption.
 * @const {string} secretWord
 */
const secretWord = 'SECRET_WORD'

/**
 * The maximum age for the token in seconds.
 * This is set to 1 hour (3600 seconds).
 * @const {number} maxAge
 */
const maxAge = 1 * 3600

/**
 * Creates a JWT (JSON Web Token) for a given email.
 * The token is signed with a secret word and has an expiration time.
 *
 * @param {string} email - The email address to be included in the token payload.
 * @returns {string} The generated JWT string.
 */
const createToken = (email: string): string => {
  return jwt.sign({ email }, secretWord, {
    expiresIn: maxAge
  })
}

export { maxAge, createToken }
