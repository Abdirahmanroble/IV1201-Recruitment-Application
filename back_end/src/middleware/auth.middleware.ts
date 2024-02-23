/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-argument */
import jwt from 'jsonwebtoken'
import { type NextFunction, type Request, type Response } from 'express'

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

type RequestWithUser = Request & {
  user?: JwtPayload
}

// Define a custom type for what you expect in your JWT payload
interface JwtPayload {
  id: string
  // add other payload properties as needed
}

/**
 * Validates the JWT token from request cookies. If valid, attaches the decoded user payload to `req.user`.
 * Responds with an error and clears the 'jwt' cookie if the token is missing or invalid.
 *
 * @param {RequestWithUser} req - Express request object with potential user payload.
 * @param {Response} res - Express response object for sending responses.
 * @param {NextFunction} next - Callback to the next middleware function.
 */

const validateToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.jwt

  if (!token) {
    res.status(401).send('Access denied. No token provided.')
  }

  try {
    const decoded = jwt.verify(token, secretWord) as JwtPayload
    req.user = decoded

    next()
  } catch (error) {
    res.clearCookie('jwt')
    res.status(400).send('Invalid token.')
  }
}

export { maxAge, createToken, validateToken }
