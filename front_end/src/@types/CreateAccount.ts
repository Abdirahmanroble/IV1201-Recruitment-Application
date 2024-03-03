import ViewModel from "../view-models/ViewModel";

export interface FormInputProps {
  text: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  counter: number;
}

export interface AccountFormProps {
  onCreateAccount: (
    firstName: string,
    lastName: string,
    email: string,
    personNumber: string,
    username: string,
    password: string
  ) => Promise<boolean>;
  errorMsg: string;
}

export interface ViewProps {
  onCreateAccount: (
    firstName: string,
    lastName: string,
    email: string,
    personNumber: string,
    username: string,
    password: string
  ) => Promise<boolean>;
  getCurrentError: () => number;
}

export interface ControllerProps {
  viewModel: ViewModel;
}
