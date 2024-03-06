import { ControllerProps } from '../@types/UpdatePassword';
import UpdatePasswordView from '../views/UpdatePasswordView/UpdatePasswordView';
import { useParams } from 'react-router-dom';

/**
 * `UpdatePasswordController` manages the password update using a token from URL parameters.
 * It renders the `UpdatePasswordView` component with a handler to process password updates.
 * 
 * @param {ControllerProps} props - The properties passed to the controller, including the view model.
 * @returns {JSX.Element} A rendered view component to update the user's password.
 */
const UpdatePasswordController = (props: ControllerProps) => {
  const { token } = useParams();

  /**
   * Asynchronous function to handle password update process.
   *
   * @param {string} newPassword - The new password.
   */
  const handleUpdatePassword = async (newPassword: string):  Promise<boolean> => {
    if (token) {
      const success = await props.viewModel.updatePassword(token, newPassword);
      return success;
    }
    
    // If there's no token, the function resolves to `false`, indicating failure.
    return false;
  };

  return <UpdatePasswordView onUpdatePassword={handleUpdatePassword} />;
};

export default UpdatePasswordController;