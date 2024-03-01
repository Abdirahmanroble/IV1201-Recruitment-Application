import { Component } from "react";
import { ControllerProps } from "../@types/CreateAccount";
import CreateAccountView from "../views/CreateAccountView/CreateAccountView";

/**
 * Represents the controller component responsible for handling logic related to creating a new account.
 *
 * @extends Component for class-based component implementation.
 */
export default class CreateAccountController extends Component<ControllerProps> {
  /**
   * Asynchronous function to handle the creation of a new account.
   *
   * @param {string} firstName - The first name of the user.
   * @param {string} lastName - The last name of the user.
   * @param {string} email - The email address of the user.
   * @param {string} personNumber - The personal identification number of the user.
   * @param {string} username - The desired username for the new account.
   * @param {string} password - The password for the new account.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the account creation.
   */
  private onCreateAccount = async (
    firstName: string,
    lastName: string,
    email: string,
    personNumber: string,
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const success: boolean = await this.props.viewModel.createAccount({
        firstName,
        lastName,
        email,
        personNumber,
        username,
        password,
      });
      return success;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  };

  render(): React.ReactNode {
    return <CreateAccountView onCreateAccount={this.onCreateAccount} />;
  }
}
