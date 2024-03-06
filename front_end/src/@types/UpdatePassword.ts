import ViewModel from "../view-models/ViewModel";

  export interface UpdatePasswordFormProps {
    onUpdatePassword: (newPassword: string, confirmNewPassword: string) => Promise<void>;
  }
  

  export interface UpdatePasswordViewProps {
    onUpdatePassword: (newPassword: string, confirmNewPassword: string) => Promise<void>;
  }

export interface ControllerProps {
    viewModel: ViewModel;
  }
