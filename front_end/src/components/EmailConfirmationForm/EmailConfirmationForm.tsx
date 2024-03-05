import { useState } from "react";
import FormInput from "../FormInput/FormInput";
import { useTranslation } from "react-i18next";
import "./UpdatePasswordForm.css";
import { EmailConfirmationBoxProps } from "../../@types/EmailConfirmation";

function EmailConfirmationForm(props: EmailConfirmationBoxProps): JSX.Element {
  const [email, setEmail] = useState("");
  const [counter, setCounter] = useState(0);
  // const [success, setSuccess] = useState(false);

  const { t } = useTranslation();

  // let errorDisplay = "none",
    // successDisplay = "none";
  // if (success === false && counter > 0) errorDisplay = "block";
  // else if (success === true && counter > 0) successDisplay = "block";

  // const tempUpdatePassword = false;

  return (
    <div className="update-password-box">
      <div className="update-password-box-header">
        {t("emailConfirmation")}
      </div>
      <div className="update-password-box-input">
        <FormInput
          text={t("email")}
          type="email"
          value={email}
          onChange={setEmail}
          counter={counter}
        />
      </div>
      <div className="update-password-box-buttons">
        <button
          onClick={() => {
            const emailConfirmationUpdated = props.onEmailConfirmation;
            setCounter(counter + 1);
            // setSuccess(emailConfirmationUpdated);
          }}
        >
          {t("emailConfirmation")}
        </button>
      </div>
      <div className="account-form-error" style={{ display: '' }}>
        {t("updatePasswordFailure")}
      </div>
      <div className="account-form-success" style={{ display: '' }}>
        {t("updatePasswordSuccess")}
      </div>
    </div>
  );
}

export default EmailConfirmationForm;
