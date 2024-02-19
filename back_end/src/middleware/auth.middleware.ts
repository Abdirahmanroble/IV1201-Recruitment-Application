import jwt from "jsonwebtoken";
import { NextFunction, type Request, type Response } from "express";

/**
 * The secret word used for token encryption.
 * @const {string} secretWord
 */
const secretWord = "SECRET_WORD";

/**
 * The maximum age for the token in seconds.
 * This is set to 1 hour (3600 seconds).
 * @const {number} maxAge
 */
const maxAge = 1 * 3600;

/**
 * Creates a JWT (JSON Web Token) for a given email.
 * The token is signed with a secret word and has an expiration time.
 *
 * @param {string} email - The email address to be included in the token payload.
 * @returns {string} The generated JWT string.
 */
const createToken = (email: string): string => {
  return jwt.sign({ email }, secretWord, {
    expiresIn: maxAge,
  });
};

type RequestWithUser = Request & {
  user?: JwtPayload;
};

// Define a custom type for what you expect in your JWT payload
interface JwtPayload {
  id: string;
  // add other payload properties as needed
}

const validateToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretWord) as JwtPayload;
    // Add the decoded user to the request object
    req.user = decoded;

    next();
  } catch (error) {
    // Handle the error scenarios appropriately
    res.clearCookie("jwt");
    res.status(400).send("Invalid token.");
    res.redirect("/");
  }
};

export { maxAge, createToken, validateToken };
