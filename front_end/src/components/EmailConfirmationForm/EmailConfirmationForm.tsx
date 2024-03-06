import { useState } from "react";
import { EmailConfirmationFormProps } from "../../@types/EmailConfirmation";
import FormInput from "../FormInput/FormInput";
// import readErrorMsg from "../../errors/Error";
import { useTranslation } from "react-i18next";
import "./EmailConfirmationForm.css";

function EmailConfirmationForm(props: EmailConfirmationFormProps): JSX.Element {
  const [email, setEmail] = useState("");
  const [counter, setCounter] = useState(0);
  const [success, setSuccess] = useState(false);

  const { t } = useTranslation();

  let errorDisplay = "none",
    successDisplay = "none";
  if (success === false && counter > 0) errorDisplay = "block";
  else if (success === true && counter > 0) successDisplay = "block";

  return (
    <div className="update-password-box">
      <div className="update-password-box-header">{t("confirmEmail")}</div>
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
          onClick={async () => {
            const emailConfirmed = await props.onEmailConfirmation(email);
            setCounter(counter + 1);
            setSuccess(emailConfirmed);
          }}
        >
          {t("confirmEmail")}
        </button>
      </div>
      <div className="account-form-error" style={{ display: errorDisplay }}>
        {t("confirmEmailFailure")}
      </div>
      <div className="account-form-success" style={{ display: successDisplay }}>
        {t("confirmEmailSuccess")}
      </div>
    </div>
  );
}

export default EmailConfirmationForm;
