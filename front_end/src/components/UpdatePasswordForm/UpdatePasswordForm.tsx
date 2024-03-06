// UpdatePasswordForm.tsx

import React, { useState } from 'react';
import { UpdatePasswordFormProps } from '../../@types/UpdatePassword';



const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ onUpdatePassword }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would probably want to validate the passwords before sending them up
    await onUpdatePassword(newPassword, confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Update Password</button>
    </form>
  );
};

export default UpdatePasswordForm;
