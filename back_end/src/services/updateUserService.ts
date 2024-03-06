/* eslint-disable @typescript-eslint/naming-convention */
import bcrypt from 'bcrypt'
import User from '../model/user'
import db from '../integration/dbConfig'
import Logger from '../util/Logger'
import { secretWord } from "../middleware/auth.middleware"
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import IntegrationValidators from '../util/integrationValidators'

/**
 * Interface representing login credentials.
 * @interface
 * @property {string} username - User's username or email.
 * @property {string} password - User's password.
 */
interface LoginCredentials {
  person_id: number
  email: string
  password: string
}
/**
 * Service class for authentication-related operations.
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class UpdateUserService {
  /**
     * Updates a user's email and password. If the user has no password, it hashes and updates it.
     * If the user has an email, it updates it.
     *
     * @param {LoginCredentials} loginCredentials - The user's login credentials.
     * @returns {Promise<string>} A promise that resolves with a success message if the update is successful.
     * @throws {Error} Throws an error if there is a problem during the update process.
     */
  public static async updateUser(token: string, newPassword: string): Promise<string> {

    const validation = IntegrationValidators.validateUpdateUserRequest(token, newPassword);
    if (!validation.isValid) {
      Logger.logException(new Error(validation.message ?? 'Invalid request body'), { file: '', reason: '' })
      throw new Error(validation.message ?? "Invalid request data.");
    }

    const transaction = await db.transaction();
    try {
      const payload = jwt.verify(token, secretWord) as JwtPayload;
      console.log('Decoded JWT payload:', payload);
      const { id } = payload;
      const user = await User.findOne({
        where: { person_id : id},
        transaction,
      });
  
      if (user === null) {
        await transaction.rollback();
        return 'User not found';
      }
      if (newPassword !== null && user.password === null) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword }, { transaction });
        await transaction.commit();
        return 'User updated successfully';
      } else {
        await transaction.rollback();
        return 'Invalid operation: password already set or new password is null.';
      }
    } catch (error) {
      await transaction.rollback();
      if (error instanceof JsonWebTokenError) {
        // Specific error message for token errors
        console.error('JWT error:', error.message);
        throw new Error('Token validation failed');
      } else {
        // Log or handle other types of errors
        console.error('Update failed:', error);
        throw new Error('Update failed: ');
      }
    }
  }

  /**
   * Retrieves a user from the database by their email address.
   * 
   * This function performs a database transaction to look up a user by their email.
   * If a user is found with a null password, the user object is still returned,
   * which could indicate a user that has not yet completed the registration process.
   * 
   * @param {string} email - The email address to search for in the user database.
   * @returns {Promise<User | null>} - A promise that resolves with the User object if found, or null if no user is found.
   * @throws {Error} If there's a problem with the database transaction or if the user lookup fails unexpectedly.
   */
  public static async getUsersByEmail (email: string): Promise<User | null> {
    
    const validation = IntegrationValidators.validateEmailForUserRetrieval(email);
    if (!validation.isValid) {
      Logger.logException(new Error(validation.message ?? "Invalid email address"), 
        { file: 'updateUserService.ts', reason: 'Something is wrong with the email' })
      throw new Error(validation.message ?? "Invalid email address.");
    }

    try {
      return await db.transaction(async () => {
        const user = await User.findOne({ where: { email } })

        if (user == null) {
          return null
        }
        if (user.password === null) {
          return user
        }
        return user
      })
    } catch (err) {
      Logger.logException(new Error('Login failed'), { file: 'authService.ts', reason: 'Could not find user' }) 
      throw new Error('An unexpected error occurred while trying to register the user')
    }
  }
}

export default UpdateUserService
