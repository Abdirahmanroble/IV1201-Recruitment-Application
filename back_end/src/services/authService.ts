/* eslint-disable @typescript-eslint/no-extraneous-class */
// authService.ts

/* import bcrypt from 'bcrypt';
import Person from '../model/person';
import db from '../integration/DAO';

interface LoginCredentials {
  username: string;
  password: string;
}

class AuthService {
  public static async login({ username, password }: LoginCredentials): Promise<Person | null> {
    try {
      const user = await Person.findOne({ where: { username } });
      if (!user) {
        return null; // User not found
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null; // Invalid password
      }

      return user; // Login successful
    } catch (error) {
      throw new Error('Login failed');
    }
  }
}

export default AuthService; */

// authService.ts
import bcrypt from "bcrypt";
import User from "../model/user";
/**
 * Defines the structure for login credentials.
 * @typedef {Object} LoginCredentials
 * @property {string} username - User's username.
 * @property {string} password - User's password.
 */
interface LoginCredentials {
  username: string;
  password: string;
}
interface registerCredentials {
  person_id: number;
  name: string;
  surname: string;
  pnr: string;
  email: string;
  username: string;
  password: string;
  role_id: number;
}
/**
 * Service class for authentication-related operations.
 */
class AuthService {
  /**
   * Attempts to authenticate a user with a username and password.
   * This method checks if a user exists with the given username and then verifies the password.
   * Note: This implementation compares plain text passwords and Will be updated to use secure password hashing in the next sprint.
   *
   * @param {LoginCredentials} loginCredentials - The login credentials containing the username and password.
   * @returns {Promise<Person | null>} - A promise that resolves to the user object if login is successful, or null if the login fails.
   * @throws {Error} - Throws an error if the login process fails due to an unexpected error.
   */
  public static async login({
    username,
    password,
  }: LoginCredentials): Promise<User | null> {
    try {
      let user: User | null = await User.findOne({ where: { username } });

      if (user == null) {
        user = await User.findOne({ where: { email: username } });

        if (user == null) {
          throw new Error("Username or email does not exist.");
        }
      }

      // Recruiter
      // if (user.role_id == "1") {
      //   const isMatch = await User.findOne({ where: { password: user.password } });
      //   if (!isMatch) {
      //       throw new Error("Password does not match.");
      //   }
      // }


      // Applicant
      // if (user.role_id == "2") {
      //   const isMatch = await bcrypt.compare(password, user.password);
      //   if (!isMatch) {
      //       throw new Error("Password does not match.");
      //   }
      // }


      if (user.password !== password) {
        return null;
      }

      return user;
    } catch (error) {
      throw new Error("Login failed");
    }
  }

  public static async register({
    name,
    surname,
    pnr,
    email,
    username,
    password,
  }: registerCredentials): Promise<User | string> {
    try {
      if (
        name === "" ||
        surname === "" ||
        pnr === "" ||
        email === "" ||
        username === "" ||
        password === ""
      ) {
        return "All fields are required";
      }

      const hash = await bcrypt.hash(password, 10);
      const userExists = await User.findOne({ where: { username } });
      if (userExists !== null) {
        return "User already exists";
      }
      const user = await User.create({
        name,
        surname,
        pnr,
        email,
        username,
        password: hash,
      });
      console.log(user.password);
      return user;
    } catch (error) {
      throw new Error("Register failed");
    }
  }
}

export default AuthService;
