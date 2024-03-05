import ViewModel from "../view-models/ViewModel";

export interface EmailConfirmationBoxProps {
  onEmailConfirmation: (email: string) => Promise<boolean>;
}

export interface ViewProps {
  onEmailConfirmation: (email: string) => Promise<boolean>;
}

export interface ControllerProps {
  viewModel: ViewModel;
}
