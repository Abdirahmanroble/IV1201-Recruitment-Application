import { ViewProps } from "../../@types/Login";
import { useTranslation } from "react-i18next";
import LoginBox from "../../components/LoginBox/LoginBox";
import "./LoginView.css";

/**
 * Represents the view component for logging in.
 *
 * @param props The props passed to the component.
 * @returns The rendered login view component.
 */
const LoginView = (props: ViewProps): React.ReactNode => {
  const { t } = useTranslation();
  return (
    <div className="login-view">
      <h1>{t("login")}</h1>
      <LoginBox
        onLogin={props.onLogin}
        getCurrentError={props.getCurrentError}
      ></LoginBox>
    </div>
  );
};

export default LoginView;
