import ViewModel from "../view-models/ViewModel";

  export interface UpdatePasswordFormProps {
    onUpdatePassword: (newPassword: string, confirmNewPassword: string) => Promise<boolean>;
  }
  

  export interface UpdatePasswordViewProps {
    onUpdatePassword: (newPassword: string, confirmNewPassword: string) => Promise<boolean>;
  }

export interface ControllerProps {
    viewModel: ViewModel;
    
  }
