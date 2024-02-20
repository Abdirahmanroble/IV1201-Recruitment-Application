import { PureComponent } from "react";

import { ViewProps } from "../../@types/ListApplications";
import "./ListApplicationsView.css";
import ApplicationCard from "../../components/ApplicationCard/ApplicationCard";

export default class ListApplicationsView extends PureComponent<ViewProps> {
  render(): React.ReactNode {
    return (
      <div className="list-applications-view">
        <h1>List Applications</h1>
        {this.props.applications.map((application, key) => {
          return (
            <ApplicationCard
              name={application.fullName}
              date={application.applicationDate}
              status={application.status}
              key={key}
            ></ApplicationCard>
          );
        })}
      </div>
    );
  }
}
