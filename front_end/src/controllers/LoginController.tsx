import { Component } from "react";
import { ControllerProps } from "../@types/Login";
import LoginView from "../views/LoginView/LoginView";

/**
 * Represents the controller component responsible for handling login logic.
 *
 * @extends Component for class-based component implementation.
 */
export default class LoginController extends Component<ControllerProps> {
  /**
   * Asynchronous function to handle the login process.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the login success.
   */
  private onLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const success = await this.props.viewModel.login({ email, password });
    return success;
  };

  private getCurrentError = () => this.props.viewModel.getCurrentError();

  /**
   * Renders the login controller component.
   *
   * @returns {React.ReactNode} The rendered login controller component.
   */
  render(): React.ReactNode {
    return (
      <LoginView
        onLogin={this.onLogin}
        getCurrentError={this.getCurrentError}
      />
    );
  }
}
