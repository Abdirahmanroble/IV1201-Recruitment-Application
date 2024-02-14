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

import Person from '../model/person'
/**
 * Defines the structure for login credentials.
 * @typedef {Object} LoginCredentials
 * @property {string} username - User's username.
 * @property {string} password - User's password.
 */
interface LoginCredentials {
  username: string
  password: string
}
/**
 * Service class for authentication-related operations.
 */
export const AuthService = {
  /**
   * Attempts to authenticate a user with a username and password.
   * This method checks if a user exists with the given username and then verifies the password.
   * Note: This implementation compares plain text passwords and Will be updated to use secure password hashing in the next sprint.
   *
   * @param {LoginCredentials} loginCredentials - The login credentials containing the username and password.
   * @returns {Promise<Person | null>} - A promise that resolves to the user object if login is successful, or null if the login fails.
   * @throws {Error} - Throws an error if the login process fails due to an unexpected error.
   */
  async login ({ username, password }: LoginCredentials): Promise<Person | null> {
    try {
      const user = await Person.findOne({ where: { username } })
      if (user === null) {
        return null
      }

      if (user.password !== password) {
        return null
      }

      return user
    } catch (error) {
      throw new Error('Login failed')
    }
  }
}
