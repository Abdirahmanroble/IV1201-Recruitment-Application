import ViewModel from "../view-models/ViewModel";

export interface ViewProps {
  username: string;
  onLogout: () => void;
}

export interface ControllerProps {
  viewModel: ViewModel;
}
