import { PureComponent } from "react";

import { ViewProps } from "../../@types/Login";
import LoginBox from "../../components/LoginBox/LoginBox";
import "./LoginView.css";

export default class LoginView extends PureComponent<ViewProps> {
  render() {
    return (
      <div className="login-view">
        <h1>This is the login view...</h1>
        <LoginBox onLogin={this.props.onLogin}></LoginBox>
      </div>
    );
  }
}
