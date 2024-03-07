import { Component } from "react";
import { ControllerProps } from "../@types/Login";
import EmailConfirmationView from "../views/EmailConfirmationView/EmailConfirmationView";

/**
 * A controller component for handling login-related functionalities.
 */
export default class EmailConfirmationController extends Component<ControllerProps> {
  /**
   * Asynchronous function for handling email confirmation.
   *
   * @param {string} email - The email to be confirmed.
   * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating the success of email confirmation.
   */
  private onEmailConfirmation = async (email: string): Promise<boolean> => {
    const success = await this.props.viewModel.emailConfirmation({ email });
    return success;
  };

  /**
   * Retrieves the current error from the view model.
   *
   * @returns {string} The current error message.
   */
  private getCurrentError = () => this.props.viewModel.getCurrentError();

  /**
   * Renders the EmailConfirmationController component.
   *
   * @returns {React.ReactNode} The rendered component.
   */
  render(): React.ReactNode {
    return (
      <EmailConfirmationView
        onEmailConfirmation={this.onEmailConfirmation}
        getCurrentError={this.getCurrentError}
      />
    );
  }
}
