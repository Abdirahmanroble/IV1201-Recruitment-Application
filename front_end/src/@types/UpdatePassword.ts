import ViewModel from "../view-models/ViewModel";

export interface UpdatePasswordFormProps {
  onUpdatePassword: (
    newPassword: string,
    confirmNewPassword: string
  ) => Promise<boolean>;
  getCurrentError: () => number;
}

export interface UpdatePasswordViewProps {
  onUpdatePassword: (
    newPassword: string,
    confirmNewPassword: string
  ) => Promise<boolean>;
  getCurrentError: () => number;
}

export interface ControllerProps {
  viewModel: ViewModel;
}
