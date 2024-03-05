import React from "react";
import { ViewProps } from "../../@types/CreateAccount";
import CreateAccountForm from "../../components/AccountForm/AccountForm";
import "./CreateAccountView.css";

/**
 * Represents the view component for creating a new account.
 *
 * @param props The props passed to the component.
 * @returns The rendered create account view component.
 */
const CreateAccountView = (props: ViewProps): React.ReactNode => {
  return (
    <div className="create-account-container">
      <h1>Create Account</h1>
      <CreateAccountForm
        onCreateAccount={props.onCreateAccount}
        getCurrentError={props.getCurrentError}
      ></CreateAccountForm>
    </div>
  );
};

export default CreateAccountView;
