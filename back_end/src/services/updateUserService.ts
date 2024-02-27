/* eslint-disable @typescript-eslint/naming-convention */
import bcrypt from 'bcrypt'
import User from '../model/user'
import db from '../integration/dbConfig'

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
  public static async updateUser ({
    person_id,
    email,
    password
  }: LoginCredentials): Promise<string> {
    // Start the transaction
    const transaction = await db.transaction()
    try {
      // Fetch the user within the transaction context
      const user = await User.findOne({
        where: { person_id },
        transaction
      })

      if (user === null) {
        // Rollback the transaction if the user is not found
        await transaction.rollback()
        return 'User not found'
      }

      // If a password is provided and the user has no password, hash and update it
      if (password !== null && user.password === null) {
        const hashedPassword = await bcrypt.hash(password, 10)
        await user.update({ password: hashedPassword }, { transaction })
      }

      // If an email is provided, update it
      if (email !== null && (user.email === null || user.email !== email)) {
        await user.update({ email }, { transaction })
      }

      // Commit the transaction after all operations are successful
      await transaction.commit()
      return 'User updated successfully'
    } catch (error) {
      // Rollback the transaction in case of any error
      await transaction.rollback()
      throw new Error('Update failed: ')
    }
  }
}
export default UpdateUserService
