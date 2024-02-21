import { useState } from "react";

import { LoginBoxProps } from "../../@types/Login";
import "./LoginBox.css";
import FormInput from "../FormInput/FormInput";

/**
 * LoginBox is a functional component that renders a login form.
 * It allows users to enter their email and password and submit these
 * credentials via the "onLogin" function passed in through props.
 *
 * @param {LoginBoxProps} props - The props for the LoginBox component.
 * @returns {React.ReactElement} The React element that represents the login form.
 */

function LoginBox(props: LoginBoxProps) {
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
