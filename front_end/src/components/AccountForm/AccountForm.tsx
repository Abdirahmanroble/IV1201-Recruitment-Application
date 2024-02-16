import { useState } from "react";

import { AccountFormProps } from "../../@types/CreateAccount";
import "./AccountForm.css";

function LoginBox(props: AccountFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [personNumber, setPersonNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="account-form-container">
      <div className="account-form-header">CREATE ACCOUNT</div>
      <div className="account-form-input">
        <div>First Name:</div>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <div>Last Name:</div>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <div>Email:</div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div>Person Number:</div>
        <input
          type="text"
          value={personNumber}
          onChange={(e) => setPersonNumber(e.target.value)}
        ></input>
        <div>Username:</div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <div>Password:</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className="account-form-buttons">
        <button
          onClick={() =>
            props.onCreateAccount(
              firstName,
              lastName,
              email,
              personNumber,
              username,
              password
            )
          }
        >
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
}

export default LoginBox;
