import { PureComponent } from "react";

import { ViewProps } from "../../@types/CreateAccount";
import CreateAccountForm from "../../components/AccountForm/AccountForm";
import "./CreateAccountView.css";

export default class CreateAccountView extends PureComponent<ViewProps> {
  render(): React.ReactNode {
    return (
      <div className="create-account-container">
        <h1>Create Account</h1>
        <CreateAccountForm
          onCreateAccount={this.props.onCreateAccount}
        ></CreateAccountForm>
      </div>
    );
  }
}
