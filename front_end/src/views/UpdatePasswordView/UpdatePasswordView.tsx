// UpdatePasswordView.tsx

import React from 'react';
import UpdatePasswordForm from '../../components/UpdatePasswordForm/UpdatePasswordForm';
import { UpdatePasswordViewProps } from '../../@types/UpdatePassword';

const UpdatePasswordView: React.FC<UpdatePasswordViewProps> = ({ onUpdatePassword }) => {
  return (
    <div>
      {/* You can include more UI elements as necessary */}
      <UpdatePasswordForm onUpdatePassword={onUpdatePassword} />
    </div>
  );
};

export default UpdatePasswordView;
