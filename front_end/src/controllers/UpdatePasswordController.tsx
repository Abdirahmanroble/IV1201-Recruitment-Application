// UpdatePasswordController.tsx
import { useParams } from 'react-router-dom';
import UpdatePasswordForm from '../components/UpdatePasswordForm/UpdatePasswordForm'; // Your form component path
import ViewModel from '../view-models/ViewModel'; // Your ViewModel path

const UpdatePasswordController = () => {
  const { token } = useParams(); // Make sure the route parameter name matches
  const viewModel = new ViewModel(); // Or get the instance from context/props if you're using a singleton

  const handleUpdatePassword = async (newPassword: string) => {
    // Call the ViewModel's updatePassword method
    if (token) {
    const success = await viewModel.updatePassword(token, newPassword);
    if (success) {
      // Handle the successful password update, e.g., redirect or show a success message
      console.log('Password updated successfully');
    } else {
      // Handle the unsuccessful attempt, e.g., show an error message
      console.error('Failed to update password');
    }
    }
  };

  return <UpdatePasswordForm onUpdatePassword={handleUpdatePassword} />;
};

export default UpdatePasswordController;
