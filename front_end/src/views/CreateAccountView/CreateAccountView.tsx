import { PureComponent } from "react";
import { ViewProps } from "../../@types/CreateAccount";
import CreateAccountForm from "../../components/AccountForm/AccountForm";
import "./CreateAccountView.css";

/**
 * Represents the view component for creating a new account.
 *
 * @extends PureComponent to optimize rendering performance.
 */
export default class CreateAccountView extends PureComponent<ViewProps> {
  /**
   * Renders the create account view component.
   *
   * @returns The rendered create account view component.
   */
  render(): React.ReactNode {
    return (
      <div className="create-account-container">
        <h1>Create Account</h1>
        <CreateAccountForm
          onCreateAccount={this.props.onCreateAccount}
          getCurrentError={this.props.getCurrentError}
        ></CreateAccountForm>
      </div>
    );
  }
}
