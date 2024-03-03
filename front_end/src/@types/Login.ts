import ViewModel from "../view-models/ViewModel";

export interface LoginBoxProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  getCurrentError: () => number;
}

export interface ViewProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  getCurrentError: () => number;
}

export interface ControllerProps {
  viewModel: ViewModel;
}
