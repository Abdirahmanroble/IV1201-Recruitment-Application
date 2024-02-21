import { Component } from "react";
import { ControllerProps } from "../@types/ListApplications";
import ListApplicationsView from "../views/ListApplicationsView/ListApplicationsView";
// import { observer } from "mobx-react";

// @observer
export default class ListApplicationsController extends Component<ControllerProps> {
  state = { data: null, error: null };

  componentDidMount(): void {
    this.getData();
  }

  getData() {
    this.props.viewModel
      .listAllApplications()
      .then((data) => this.setState({ data: data }))
      .catch((error) => this.setState({ error: error }));
  }

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
