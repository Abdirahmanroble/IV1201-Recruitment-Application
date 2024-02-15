import jwt from "jsonwebtoken";

const secretWord = "SECRET_WORD";
const maxAge = 1 * 3600;
const createToken = (email: string) => {
  return jwt.sign({ email }, secretWord, {
    expiresIn: maxAge,
  });
};

export { maxAge, createToken };
