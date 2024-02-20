import { Component } from "react";
import { ControllerProps } from "../@types/ListApplications";
import ListApplicationsView from "../views/ListApplicationsView/ListApplicationsView";
// import { observer } from "mobx-react";

// @observer
export default class ListApplicationsController extends Component<ControllerProps> {
  render(): React.ReactNode {
    return <ListApplicationsView />;
  }
}
