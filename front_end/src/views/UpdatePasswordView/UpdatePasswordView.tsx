import React from "react";
import { useTranslation } from "react-i18next";
import UpdatePasswordForm from "../../components/UpdatePasswordForm/UpdatePasswordForm";
import "./UpdatePasswordView.css";
import { UpdatePasswordViewProps } from "../../@types/UpdatePassword";

/**
 * Component for rendering the update password view.
 * It displays a header and an `UpdatePasswordForm` for updating a user's password.
 *
 * @param {UpdatePasswordViewProps} props - The properties passed to the update password view component.
 * @returns {React.ReactNode} The `UpdatePasswordView` component.
 */
const UpdatePasswordView = (props: UpdatePasswordViewProps): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <div className="update-password-view">
      <h1>{t("updatePasswordHeader")}</h1>
      <UpdatePasswordForm onUpdatePassword={props.onUpdatePassword}></UpdatePasswordForm>
    </div>
  );
};

export default UpdatePasswordView;