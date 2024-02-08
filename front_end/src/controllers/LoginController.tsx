import { Component } from "react";
import { ControllerProps } from "../@types/Login";
import LoginView from "../views/LoginView/LoginView";

export default class LoginController extends Component<ControllerProps> {
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

  render() {
    return <LoginView onLogin={this.onLogin} />;
  }
}
