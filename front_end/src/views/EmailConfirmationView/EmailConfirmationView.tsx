import { useTranslation } from "react-i18next";
import "./EmailConfirmationView.css";
import EmailConfirmationForm from "../../components/EmailConfirmationForm/EmailConfirmationForm";
import { ViewProps } from "../../@types/EmailConfirmation";

/**
 * Represents the view component for the home page.
 *
 * @param props The props passed to the component.
 * @returns The rendered home view component.
 */
const EmailConfirmationView = (props: ViewProps): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <div className="home-view">
      <h1>{t("email")}</h1>
      {/* <h2>
        {t("welcome")} {props.username}{" "}
      </h2> */}
      <EmailConfirmationForm 
        onEmailConfirmation={props.onEmailConfirmation}
      ></EmailConfirmationForm>
    </div>
  );
};

export default EmailConfirmationView;
