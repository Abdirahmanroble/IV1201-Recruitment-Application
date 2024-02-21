import { PureComponent } from "react";
import { ViewProps } from "../../@types/Home";
import "./HomeView.css";

/**
 * Represents the view component for the home page.
 *
 * @extends PureComponent to optimize rendering performance.
 */
export default class HomeView extends PureComponent<ViewProps> {
  /**
   * Renders the home view component.
   *
   * @returns The rendered home view component.
   */
  render(): React.ReactNode {
    return (
      <div className="home-view">
        <h1>Home</h1>
        <h2>Welcome {this.props.username}</h2>
      </div>
    );
  }
}
