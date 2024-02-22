import ViewModel from "../view-models/ViewModel";

export interface LoginBoxProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
}

export interface ViewProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
}

export interface ControllerProps {
  viewModel: ViewModel;
}
