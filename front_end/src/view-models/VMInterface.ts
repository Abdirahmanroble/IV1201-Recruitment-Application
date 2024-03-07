import {
  ApplicationsPromiseBody,
  CreateAccountParams,
  EmailParams,
  LoginParams,
} from "../@types/ViewModel";
import ViewModel from "./ViewModel";

/**
 * The ViewModel interface represents the view model for managing user authentication,
 * user data, and application-related operations.
 */
export interface VM {
  /**
   * Changes the authentication state of the user.
   * @param state The new authentication state.
   */
  changeAuthState: (state: boolean) => void;

  /**
   * Changes the state of the view model.
   * @param viewModel The new view model state.
   */
  changeState: (viewModel: ViewModel) => void;

  /**
   * Logs the user in with the provided parameters.
   * @param params The login parameters.
   * @returns A promise that resolves to true if the login is successful, otherwise false.
   */
  login(params: LoginParams): Promise<boolean>;

  /**
   * Creates a new user account with the provided parameters.
   * @param params The account creation parameters.
   * @returns A promise that resolves to true if the account creation is successful, otherwise false.
   */
  createAccount(params: CreateAccountParams): Promise<boolean>;

  /**
   * Specifies a method to confirm an email.
   *
   * @param {EmailParams} params - Parameters required for email confirmation.
   * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating the success of email confirmation.
   */
  emailConfirmation(params: EmailParams): Promise<boolean>;

  /**
   * Specifies a method to update a password.
   *
   * @param {string} token - The token for password update.
   * @param {string} newPassword - The new password to be set.
   * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating the success of password update.
   */
  updatePassword(token: string, newPassword: string): Promise<boolean>;

  /**
   * Retrieves a list of all applications.
   * @returns A promise that resolves to the applications data.
   */
  listAllApplications(): Promise<ApplicationsPromiseBody>;

  /**
   * Attempts to log out the current user by making a POST request to the backend logout endpoint.
   * The backend logout endpoint is then expected to clear the authentication cookie.
   * If the request is successful, it updates the "signedIn" state to false, indicating that the user is no longer authenticated.
   * It handles any errors by logging them and returning false, indicating the logout attempt was unsuccessful.
   *
   * @returns A promise that resolves to "true" if the logout was successful,
   * or "false" if the logout failed due to either a non-OK response from the server or a network error.
   */
  logout(): Promise<boolean>;

  /**
   * Sets the first name of the user.
   * @param firstName The first name to set.
   */
  setFirstName(firstName: string): void;

  /**
   * Sets the last name of the user.
   * @param lastName The last name to set.
   */
  setLastName(lastName: string): void;

  /**
   * Sets the person number of the user.
   * @param personNumber The person number to set.
   */
  setPersonNumber(personNumber: string): void;

  /**
   * Sets the email address of the user.
   * @param email The email address to set.
   */
  setEmail(email: string): void;

  /**
   * Sets the username of the user.
   * @param username The username to set.
   */
  setUsername(username: string): void;

  /**
   * Sets the competences of the user.
   * @param competences The competences to set.
   */
  setCompetences(
    competences: { yearsOfExperience: number; name: string }[]
  ): void;

  /**
   * Sets the role of the user.
   * @param role The role to set.
   */
  setRole(role: number): void;

  /**
   * Sets the callback function to change the authentication state.
   * @param changeAuthState The callback function to change the authentication state.
   */
  setChangeAuthState(changeAuthState: (state: boolean) => void): void;

  /**
   * Sets the callback function to change the state of the view model.
   * @param changeState The callback function to change the state of the view model.
   */
  setChangeState(changeState: (viewModel: ViewModel) => void): void;

  /**
   * Retrieves the first name of the user.
   * @returns The first name of the user.
   */
  getFirstName(): string;

  /**
   * Retrieves the last name of the user.
   * @returns The last name of the user.
   */
  getLastName(): string;

  /**
   * Retrieves the person number of the user.
   * @returns The person number of the user.
   */
  getPersonNumber(): string;

  /**
   * Retrieves the email address of the user.
   * @returns The email address of the user.
   */
  getEmail(): string;

  /**
   * Retrieves the username of the user.
   * @returns The username of the user.
   */
  getUsername(): string;

  /**
   * Retrieves the competences of the user.
   * @returns The competences of the user.
   */
  getCompetences(): { yearsOfExperience: number; name: string }[];

  /**
   * Retrieves the role of the user.
   * @returns The role of the user.
   */
  getRole(): number;
}
