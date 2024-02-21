import { PureComponent } from "react";
import { ViewProps } from "../../@types/ListApplications";
import ApplicationCard from "../../components/ApplicationCard/ApplicationCard";
import "./ListApplicationsView.css";

/**
 * Represents the view component for listing applications.
 *
 * @extends PureComponent to optimize rendering performance.
 */
export default class ListApplicationsView extends PureComponent<ViewProps> {
  /**
   * Renders the list applications view component.
   *
   * @returns The rendered list applications view component.
   */
  render(): React.ReactNode {
    return (
      <div className="list-applications-view">
        <h1>List Applications</h1>
        {/* Map through the applications array and render an ApplicationCard for each application */}
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
