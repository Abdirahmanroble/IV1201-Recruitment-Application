import { ViewProps } from "../../@types/Login";
import { useTranslation } from "react-i18next";
import LoginBox from "../../components/LoginBox/LoginBox";
import "./LoginView.css";

/**
 * Represents the view component for the login functionality.
 *
 * @extends PureComponent to optimize rendering performance.
 */ 


const LoginView: React.FC<ViewProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div className="login-view">
      <h1>{t('login')}</h1>
      <LoginBox onLogin={props.onLogin}></LoginBox>
    </div>
  );
};

 export default LoginView;
