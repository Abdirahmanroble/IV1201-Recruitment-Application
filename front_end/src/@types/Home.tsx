import ApplicantViewModel from "../view-models/ApplicantViewModel";

export interface ViewProps {
  email: string;
  onLogout: () => void;
}

export interface ControllerProps {
  viewModel: ApplicantViewModel;
  logout: () => void;
}
