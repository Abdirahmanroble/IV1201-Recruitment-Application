import { ViewProps } from "../../@types/EmailConfirmation";
import { useTranslation } from "react-i18next";
import EmailConfirmationForm from "../../components/EmailConfirmationForm/EmailConfirmationForm";
import "./EmailConfirmationView.css";

const EmailConfirmationView = (props: ViewProps): React.ReactNode => {
  const { t } = useTranslation();
  return (
    <div className="email-confirmation-view">
      <h1>{t("confirmEmail")}</h1>
      <EmailConfirmationForm
        onEmailConfirmation={props.onEmailConfirmation}
        getCurrentError={props.getCurrentError}
      ></EmailConfirmationForm>
    </div>
  );
};

export default EmailConfirmationView;
