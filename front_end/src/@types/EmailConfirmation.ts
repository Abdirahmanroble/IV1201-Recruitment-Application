import ViewModel from "../view-models/ViewModel";

export interface EmailConfirmationFormProps {
  onEmailConfirmation: (email: string) => Promise<boolean>;
  getCurrentError: () => number;
}

export interface ViewProps {
  onEmailConfirmation: (email: string) => Promise<boolean>;
  getCurrentError: () => number;
}

export interface ControllerProps {
  viewModel: ViewModel;
}
