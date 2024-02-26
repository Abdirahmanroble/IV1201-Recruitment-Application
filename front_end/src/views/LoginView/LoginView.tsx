import { PureComponent } from "react";
import { ViewProps } from "../../@types/Login";
import LoginBox from "../../components/LoginBox/LoginBox";
import "./LoginView.css";

/**
 * Represents the view component for the login functionality.
 *
 * @extends PureComponent to optimize rendering performance.
 */
export default class LoginView extends PureComponent<ViewProps> {
  /**
   * Renders the login view component.
   *
   * @returns The rendered login view component.
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
