import { ViewProps } from "../../@types/Login";
import { useTranslation } from "react-i18next";
import LoginBox from "../../components/LoginBox/LoginBox";
import "./LoginView.css";

const LoginView: React.FC<ViewProps> = (props) => {
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
