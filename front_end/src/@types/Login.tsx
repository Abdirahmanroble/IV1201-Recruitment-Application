/**
 * The LoginTypes contains the interfaces describing the properties of the components
 * handling the login.
 */

import ApplicantViewModel from "../view-models/ApplicantViewModel";

export interface LoginBoxProps {
  onLogin: (email: string, password: string) => void;
}

export interface ViewProps {
  onLogin: (email: string, password: string) => void;
}

export interface ControllerProps {
  viewModel: ApplicantViewModel;
  login: () => void;
  changeState: (viewModel: ApplicantViewModel) => void;
}
