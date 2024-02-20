import { PureComponent } from "react";

import { ViewProps } from "../../@types/ListApplications";
import "./ListApplicationsView.css";

export default class ListApplicationsView extends PureComponent<ViewProps> {
  render(): React.ReactNode {
    return (
      <div className="list-applications-view">
        <h1>List Applications</h1>
      </div>
    );
  }
}
