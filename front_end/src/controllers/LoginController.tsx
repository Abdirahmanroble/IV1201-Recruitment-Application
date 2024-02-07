// import { observer } from "mobx-react";
import { Component } from "react";

import { ControllerProps } from "../@types/Login";
import LoginView from "../views/LoginView/LoginView";

// @observer
export default class LoginController extends Component<ControllerProps> {
  private onLogin = (email: string, password: string) => {
    const success: boolean = this.props.viewModel.login(email, password);
    if (success) this.props.login();
  };
  render() {
    return (
      <LoginView
        onLogin={(email: string, password: string) =>
          this.onLogin(email, password)
        }
      />
    );
  }
}
