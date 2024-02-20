import ViewModel from "../view-models/ViewModel";

export interface LoginBoxProps {
  onLogin: (email: string, password: string) => void;
}

export interface ViewProps {
  onLogin: (email: string, password: string) => void;
}

export interface ControllerProps {
  viewModel: ViewModel;
}
