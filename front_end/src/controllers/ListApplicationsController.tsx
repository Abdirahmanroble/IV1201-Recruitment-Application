import { Component } from "react";
import { ControllerProps } from "../@types/ListApplications";
import ListApplicationsView from "../views/ListApplicationsView/ListApplicationsView";

/**
 * Represents the controller component responsible for handling logic related to listing applications.
 *
 * @extends Component for class-based component implementation.
 */
export default class ListApplicationsController extends Component<ControllerProps> {
  /**
   * State containing data and error information.
   * @type {{ data: any | null, error: any | null }}
   */
  state: { data: any | null; error: any | null } = { data: null, error: null };

  /**
   * Lifecycle method invoked after the component is mounted.
   * Calls the getData method to fetch application data.
   */
  componentDidMount(): void {
    this.getData();
  }

  /**
   * Fetches application data from the view model.
   */
  getData() {
    this.props.viewModel
      .listAllApplications()
      .then((data) => this.setState({ data: data.applications }))
      .catch((error) => this.setState({ error: error }));
  }

  /**
   * Renders the list applications controller component.
   *
   * @returns {React.ReactNode} The rendered list applications controller component.
   */
  render(): React.ReactNode {
    return this.state.data ? (
      <ListApplicationsView applications={this.state.data} />
    ) : this.state.error ? (
      <div></div>
    ) : (
      <div></div>
    );
  }
}
