import { useState } from "react";
import FormInput from "../FormInput/FormInput";
import { useTranslation } from "react-i18next";
import "./UpdatePasswordForm.css";
import { UpdatePasswordFormProps } from "../../@types/UpdatePassword";

/**
 * Renders a form for updating the user's password. It includes fields for the new password
 * and password confirmation. It provides feedback to the user after an attempt to update the password,
 * displaying either a success or an error message.
 *
 * @param {UpdatePasswordFormProps} props - The properties required by the UpdatePasswordForm component, 
 * including the onUpdatePassword function which is called when the user submits the form.
 * @returns {JSX.Element} - The rendered form component for password update.
 */
function UpdatePasswordForm(props: UpdatePasswordFormProps): JSX.Element {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [counter, setCounter] = useState(0);
  const [success, setSuccess] = useState(false);

  const { t } = useTranslation();

  let errorDisplay = "none",
    successDisplay = "none";
  if (success === false && counter > 0) errorDisplay = "block";
  else if (success === true && counter > 0) successDisplay = "block";


  return (
    <div className="update-password-box">
      <div className="update-password-box-header">
        {t("updatePasswordHeader")}
      </div>
      <div className="update-password-box-input">
        <FormInput
          text={t("password")}
          type="password"
          value={password}
          onChange={setPassword}
          counter={counter}
        />
        <FormInput
          text={"Confirm " + t("password")}
          type="password"
          value={passwordConfirmation}
          onChange={setPasswordConfirmation}
          counter={counter}
        />
      </div>
      <div className="update-password-box-buttons">
        <button
          onClick={async () => {
            const passwordWasUpdated = await props.onUpdatePassword(password, passwordConfirmation)
            setCounter(counter + 1);
            setSuccess(passwordWasUpdated);
          }}
        >
          {t("updatePasswordHeader")}
        </button>
      </div>
      <div className="account-form-error" style={{ display: errorDisplay }}>
        {t("updatePasswordFailure")}
      </div>
      <div className="account-form-success" style={{ display: successDisplay }}>
        {t("updatePasswordSuccess")}
      </div>
    </div>
  );
}

export default UpdatePasswordForm;