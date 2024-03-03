import { useState } from "react";
import { LoginBoxProps } from "../../@types/Login";
import FormInput from "../FormInput/FormInput";
import { useTranslation } from "react-i18next";
import "./LoginBox.css";

/**
 * Represents a login box component used for user authentication.
 *
 * @param {LoginBoxProps} props - The properties passed to the LoginBox component.
 * @returns {JSX.Element} The rendered login box component.
 */
function LoginBox(props: LoginBoxProps): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(0);
  const [success, setSuccess] = useState(false);

  const { t } = useTranslation();

  let invalidCredentials = "none",
    emptyBox = "none";
  if ((email === "" || password === "") && counter > 0) emptyBox = "block";
  else if (success === false && counter > 0) invalidCredentials = "block";

  return (
    <div className="login-box">
      <div className="login-box-header">{t("userLogin")}</div>
      <div className="login-box-input">
        <FormInput
          text={t("email")}
          type="email"
          value={email}
          onChange={setEmail}
          counter={counter}
        />
        <FormInput
          text={t("password")}
          type="password"
          value={password}
          onChange={setPassword}
          counter={counter}
        />
      </div>
      <div className="login-box-buttons">
        <button
          onClick={async () => {
            const userWasLoggedIn = await props.onLogin(email, password);
            setCounter(counter + 1);
            setSuccess(userWasLoggedIn);
          }}
        >
          {t("login")}
        </button>
      </div>
      <div
        className="login-box-error"
        style={{ display: `${invalidCredentials}` }}
      >
        {t("invalidCredentials")}
      </div>
      <div className="login-box-error" style={{ display: `${emptyBox}` }}>
        {t("fillEmptyBoxes")}
      </div>
    </div>
  );
}

export default LoginBox;
