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
    const transaction = await db.transaction()
    try {
      const user = await User.findOne({
        where: { person_id },
        transaction
      })

      if (user === null) {
        await transaction.rollback()
        return 'User not found'
      }
      if (password !== null && user.password === null) {
        const hashedPassword = await bcrypt.hash(password, 10)
        await user.update({ password: hashedPassword }, { transaction })
      }

      if (email !== null && (user.email === null || user.email !== email)) {
        await user.update({ email }, { transaction })
      }
      await transaction.commit()
      return 'User updated successfully'
    } catch (error) {
      await transaction.rollback()
      throw new Error('Update failed: ')
    }
  }
}
export default UpdateUserService
