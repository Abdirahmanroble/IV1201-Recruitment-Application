import { useState } from "react";

import { LoginBoxProps } from "../../@types/Login";
import "./LoginBox.css";

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
  const [success, setSuccess] = useState(true);

  let display = "none";
  if (success === false) display = "block";

  return (
    <div className="login-box">
      <div className="login-box-header">USER LOGIN</div>
      <div className="login-box-input">
        <div>Email:</div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div>Password:</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className="login-box-buttons">
        <button
          onClick={async () => {
            const userWasLoggedIn = await props.onLogin(email, password);
            setCounter(counter + 1);
            setSuccess(userWasLoggedIn);
          }}
        >
          LOGIN
        </button>
      </div>
      <div className="login-box-error" style={{ display: `${display}` }}>
        {`Invalid credentials (${counter})`}
      </div>
    </div>
  );
}

export default LoginBox;
