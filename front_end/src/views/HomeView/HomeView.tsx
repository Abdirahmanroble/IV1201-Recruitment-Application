import { PureComponent } from "react";

import { ViewProps } from "../../@types/Home";
import "./HomeView.css";

export default class HomeView extends PureComponent<ViewProps> {
  render() {
    return (
      <div className="home-view">
        <h1>This is the home view...</h1>
        <h2>You are now logged in</h2>
        <button onClick={this.props.onLogout}>LOGOUT</button>
      </div>
    );
  }
}
