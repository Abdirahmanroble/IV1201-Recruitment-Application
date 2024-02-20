import ViewModel from "../view-models/ViewModel";

export interface AccountFormProps {
  onCreateAccount: (
    firstName: string,
    lastName: string,
    email: string,
    personNumber: string,
    username: string,
    password: string
  ) => void;
}

export interface ViewProps {
  onCreateAccount: (
    firstName: string,
    lastName: string,
    email: string,
    personNumber: string,
    username: string,
    password: string
  ) => void;
}

export interface ControllerProps {
  viewModel: ViewModel;
}
