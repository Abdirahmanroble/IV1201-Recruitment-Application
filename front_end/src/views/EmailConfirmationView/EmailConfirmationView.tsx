import { ViewProps } from "../../@types/EmailConfirmation";
import { useTranslation } from "react-i18next";
import EmailConfirmationForm from "../../components/EmailConfirmationForm/EmailConfirmationForm";
import "./EmailConfirmationView.css";

/**
 * A view component for displaying email confirmation interface.
 *
 * @param {ViewProps} props - The props for the EmailConfirmationView component.
 * @returns {React.ReactNode} JSX element representing the email confirmation view.
 */
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
