import { PureComponent } from "react";

import { ViewProps } from "../../@types/Login";
import LoginBox from "../../components/LoginBox/LoginBox";
import "./LoginView.css";

/**
 * LoginView is a React component that renders the login interface.
 * It includes the LoginBox component and a heading.
 *
 * @extends PureComponent
 */
export default class LoginView extends PureComponent<ViewProps> {
  /**
   * Render the login view component.
   *
   * @returns {React.ReactNode} The React element representing the login view.
   */
  render(): React.ReactNode {
    return (
      <div className="login-view">
        <h1>Login</h1>
        <LoginBox onLogin={this.props.onLogin}></LoginBox>
      </div>
    );
  }
}
