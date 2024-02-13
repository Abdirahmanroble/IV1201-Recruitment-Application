import { PureComponent } from "react";

import { ViewProps } from "../../@types/Home";
import "./HomeView.css";

/**
 * HomeView is a React component that renders the home interface.
 * It displays a welcome message and a logout button.
 *
 * @extends PureComponent
 */
export default class HomeView extends PureComponent<ViewProps> {
  /**
   * Render the home view component.
   *
   * @returns {React.ReactNode} The React element representing the home view.
   */
  render(): React.ReactNode {
    return (
      <div className="home-view">
        <h1>This is the home view...</h1>
        <h2>You are now logged in</h2>
        <button onClick={this.props.onLogout}>LOGOUT</button>
      </div>
    );
  }
}
