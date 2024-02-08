// import { observer } from "mobx-react";
import { Component } from "react";

import { ControllerProps } from "../@types/Home";
import HomeView from "../views/HomeView/HomeView";

// @observer
export default class HomeController extends Component<ControllerProps> {
  private onLogout = () => this.props.logout();
  render() {
    return (
      <HomeView
        email={this.props.viewModel.email}
        onLogout={() => this.onLogout()}
      />
    );
  }
}
