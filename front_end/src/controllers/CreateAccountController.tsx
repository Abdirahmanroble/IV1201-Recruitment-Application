import { Component } from "react";
import { ControllerProps } from "../@types/CreateAccount";
import CreateAccountView from "../views/CreateAccountView/CreateAccountView";
// import { observer } from "mobx-react";

// @observer
export default class CreateAccountController extends Component<ControllerProps> {
  private onCreateAccount = (
    firstName: string,
    lastName: string,
    email: string,
    personNumber: string,
    username: string,
    password: string
  ) => {
    const success: boolean = this.props.viewModel.createAccount(
      firstName,
      lastName,
      email,
      personNumber,
      username,
      password
    );
    if (success) console.log("SUCCESS");
    else console.log("FAILED ATTEMPT");
  };

  render(): React.ReactNode {
    return <CreateAccountView onCreateAccount={this.onCreateAccount} />;
  }
}
