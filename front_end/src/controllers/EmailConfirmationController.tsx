import { Component } from "react";
import { ControllerProps } from "../@types/Login";
import EmailConfirmationView from "../views/EmailConfirmationView/EmailConfirmationView";

/**
 * Represents the controller component responsible for handling login logic.
 *
 * @extends Component for class-based component implementation.
 */
export default class EmailConfirmationController extends Component<ControllerProps> {
  /**
   * Asynchronous function to handle the login process.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the login success.
   */
  private onEmailConfirmation = async (
    email: string
  ): Promise<boolean> => {
    const success = await this.props.viewModel.emailConfirmation({ email });
    return success;
  };

  /**
   * Renders the login controller component.
   *
   * @returns {React.ReactNode} The rendered login controller component.
   */
  render(): React.ReactNode {
    return (
        <EmailConfirmationView onEmailConfirmation={this.onEmailConfirmation} />
    );
  }
}
