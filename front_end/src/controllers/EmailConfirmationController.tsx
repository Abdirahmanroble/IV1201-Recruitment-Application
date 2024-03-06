import { Component } from "react";
import { ControllerProps } from "../@types/Login";
import EmailConfirmationView from "../views/EmailConfirmationView/EmailConfirmationView";

export default class LoginController extends Component<ControllerProps> {
  private onEmailConfirmation = async (email: string): Promise<boolean> => {
    const success = await this.props.viewModel.emailConfirmation({ email });
    return success;
  };

  private getCurrentError = () => this.props.viewModel.getCurrentError();

  render(): React.ReactNode {
    return (
      <EmailConfirmationView
        onEmailConfirmation={this.onEmailConfirmation}
        getCurrentError={this.getCurrentError}
      />
    );
  }
}
