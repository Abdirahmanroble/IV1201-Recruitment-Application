/**
 * HomeController is responsible for managing the state and actions of the home view.
 * It connects the HomeView with the necessary handlers for logging out.
 *
 * @extends Component
 */

import { Component } from "react";
import { ControllerProps } from "../@types/Home";
import HomeView from "../views/HomeView/HomeView";
// import { observer } from "mobx-react";

// @observer
export default class HomeController extends Component<ControllerProps> {
  private onLogout = () => this.props.logout();

  /**
   * Renders the HomeView component, passing the email and onLogout handler as props.
   *
   * @returns {React.ReactNode} The rendered component.
   */

  render(): React.ReactNode {
    return (
      <HomeView
        email={this.props.viewModel.email}
        onLogout={() => this.onLogout()}
      />
    );
  }
}
