/**
 * LoginController is responsible for handling the login process.
 * It connects the LoginView with the ViewModel to process authentication.
 *
 * @extends Component
 */

import { Component } from "react";
import { ControllerProps } from "../@types/Login";
import LoginView from "../views/LoginView/LoginView";

export default class LoginController extends Component<ControllerProps> {
  /**
   * Handles the login logic when a user attempts to log in.
   *
   * @param {string} email - The email provided by the user.
   * @param {string} password - The password provided by the user.
   */

  private onLogin = async (email: string, password: string) => {
    try {
      const success = await this.props.viewModel.login(email, password);
      if (success) {
        this.props.login();
        this.props.viewModel.setEmail(email);
        this.props.changeState(this.props.viewModel);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  /**
   * Renders the HomeView component, passing the email and onLogout handler as props.
   *
   * @returns {React.ReactNode} The rendered component.
   */

  render(): React.ReactNode {
    return <LoginView onLogin={this.onLogin} />;
  }
}
