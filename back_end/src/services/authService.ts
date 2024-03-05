/* eslint-disable @typescript-eslint/naming-convention */
import bcrypt from 'bcrypt'
import User from '../model/user'
import db from '../integration/dbConfig'
import Application from '../model/application'
import Availability from '../model/availability'
/**
 * Interface representing login credentials.
 * @interface
 * @property {string} username - User's username or email.
 * @property {string} password - User's password.
 */
interface LoginCredentials {
  username: string
  password: string
}
/**
 * Interface representing registration credentials.
 * @interface
 * @property {number} person_id - Unique identifier for the person.
 * @property {string} name - User's first name.
 * @property {string} surname - User's last name.
 * @property {string} pnr - Personal identification number.
 * @property {string} email - User's email address.
 * @property {string} username - Desired username for the account.
 * @property {string} password - Password for the account.
 * @property {number} role_id - Role identifier for the user.
 */
interface registerCredentials {
  person_id: number
  name: string
  surname: string
  pnr: string
  email: string
  username: string
  password: string
  role_id: number
}

/**
 * Service class for authentication-related operations.
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class AuthService {
  /**
   * Authenticates a user using their username (or email) and password.
   * Verifies if the user exists and if the provided password matches the stored password hash.
   *
   * @param {LoginCredentials} loginCredentials - The user's login credentials.
   * @returns {Promise<User | null>} A promise that resolves with the user object if authentication is successful, or null if authentication fails.
   * @throws {Error} Throws an error if there is a problem during the authentication process.
   */
  public static async login ({
    username,
    password
  }: LoginCredentials): Promise<User | null> {
    try {
      return await db.transaction(async () => {
        let user = await User.findOne({ where: { username } })
        if (user == null) {
          user = await User.findOne({ where: { email: username } })
        }

        if (user == null) {
          return null
        }
        if (user.password === null) {
          return user
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
          return user
        } else {
          return null
        }
      })
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  /**
   * Registers a new user with the provided credentials.
   * Checks if a user with the same username already exists and hashes the password before storing it.
   *
   * @param {registerCredentials} registrationData - The data required to register a new user.
   * @returns {Promise<User | string>} A promise that resolves with the newly created user object, or a string indicating that the user already exists.
   * @throws {Error} Throws an error if there is a problem during the registration process.
   */
  public static async register ({
    name,
    surname,
    pnr,
    email,
    username,
    password,
    role_id
  }: registerCredentials): Promise<User | string> {
    try {
      return await db.transaction(async () => {
        const hash = await bcrypt.hash(password, 10)
        const userExists = await User.findOne({ where: { username } })
        if (userExists !== null) {
          return 'User already exists'
        }
        const role_id = 2
        const user = await User.create({
          name,
          surname,
          pnr,
          email,
          username,
          password: hash,
          role_id
        })
        if (user.person_id == null) {
          throw new Error('Failed to create user properly, person_id is missing.')
        }
        const to_date = new Date()

        to_date.setFullYear(to_date.getFullYear() + 1)
        const newAvailability = await Availability.create({
          person_id: user.person_id,
          from_date: new Date(),
          to_date
        })
        const newApplication = await Application.create({
          person_id: user.person_id,
          availability_id: newAvailability.availability_id,
          status: 'unhandled',
          applicationdate: newAvailability.from_date,
          openapplicationstatus: true
        })
        console.log(newApplication)
        return user
      })
    } catch (error) {
      throw new Error('Register failed')
    }
  }
}

export default AuthService
