import { useState } from "react";
import { LoginBoxProps } from "../../@types/Login";
import FormInput from "../FormInput/FormInput";
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

  let invalidCredentials = "none",
    emptyBox = "none";
  if ((email === "" || password === "") && counter > 0) emptyBox = "block";
  else if (success === false && counter > 0) invalidCredentials = "block";

  return (
    <div className="login-box">
      <div className="login-box-header">USER LOGIN</div>
      <div className="login-box-input">
        <FormInput
          text="Email:"
          type="email"
          value={email}
          onChange={setEmail}
          counter={counter}
        ></FormInput>
        <FormInput
          text="Password:"
          type="password"
          value={password}
          onChange={setPassword}
          counter={counter}
        ></FormInput>
      </div>
      <div className="login-box-buttons">
        <button
          onClick={async () => {
            const userWasLoggedIn = await props.onLogin(email, password);
            if (!(email === "" || password === "")) setCounter(counter + 1);
            setSuccess(userWasLoggedIn);
          }}
        >
          LOGIN
        </button>
      </div>
      <div
        className="login-box-error"
        style={{ display: `${invalidCredentials}` }}
      >
        {`Invalid credentials (${counter})`}
      </div>
      <div className="login-box-error" style={{ display: `${emptyBox}` }}>
        Please fill in the empty boxes
      </div>
    </div>
  );
}

export default LoginBox;
