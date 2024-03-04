import React from "react";
import { useTranslation } from "react-i18next";
import UpdatePasswordForm from "../../components/UpdatePasswordForm/UpdatePasswordForm";
import "./UpdatePasswordView.css";

const UpdatePasswordView = (): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <div className="update-password-view">
      <h1>{t("updatePasswordHeader")}</h1>
      <UpdatePasswordForm></UpdatePasswordForm>
    </div>
  );
};

export default UpdatePasswordView;
