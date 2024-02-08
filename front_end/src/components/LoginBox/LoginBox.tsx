import { useState } from "react";

import { LoginBoxProps } from "../../@types/Login";
import "./LoginBox.css";

function LoginBox(props: LoginBoxProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <button onClick={() => props.onLogin(email, password)}>LOGIN</button>
      </div>
    </div>
  );
}

export default LoginBox;
