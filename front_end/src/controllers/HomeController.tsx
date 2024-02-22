import { Component } from "react";
import { ControllerProps } from "../@types/Home";
import HomeView from "../views/HomeView/HomeView";

/**
 * Represents the controller component responsible for handling logic related to the home page.
 *
 * @extends Component for class-based component implementation.
 */
export default class HomeController extends Component<ControllerProps> {
  /**
   * Renders the home controller component.
   *
   * @returns {React.ReactNode} The rendered home controller component.
   */
  render(): React.ReactNode {
    return <HomeView username={this.props.viewModel.getUsername()} />;
  }
}
