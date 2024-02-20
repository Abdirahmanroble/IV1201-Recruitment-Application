import { useState } from "react";

import { AccountFormProps } from "../../@types/CreateAccount";
import "./AccountForm.css";
import FormInput from "../FormInput/FormInput";

function LoginBox(props: AccountFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [personNumber, setPersonNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(0);
  const [success, setSuccess] = useState(false);

  let errorDisplay = "none",
    successDisplay = "none";
  if (success === false && counter > 0) errorDisplay = "block";
  else if (success === true && counter > 0) successDisplay = "block";

  return (
    <div className="account-form-container">
      <div className="account-form-header">CREATE ACCOUNT</div>
      <div className="account-form-input">
        <FormInput
          text="First Name:"
          type="text"
          value={firstName}
          onChange={setFirstName}
          counter={counter}
        ></FormInput>
        <FormInput
          text="Last Name:"
          type="text"
          value={lastName}
          onChange={setLastName}
          counter={counter}
        ></FormInput>
        <FormInput
          text="Email:"
          type="email"
          value={email}
          onChange={setEmail}
          counter={counter}
        ></FormInput>
        <FormInput
          text="Person Number:"
          type="text"
          value={personNumber}
          onChange={setPersonNumber}
          counter={counter}
        ></FormInput>
        <FormInput
          text="Username:"
          type="text"
          value={username}
          onChange={setUsername}
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
      <div className="account-form-buttons">
        <button
          onClick={async () => {
            const userWasCreated = await props.onCreateAccount(
              firstName,
              lastName,
              email,
              personNumber,
              username,
              password
            );
            setCounter(counter + 1);
            setSuccess(userWasCreated);
          }}
        >
          CREATE ACCOUNT
        </button>
      </div>
      <div
        className="account-form-error"
        style={{ display: `${errorDisplay}` }}
      >
        Please fill in the empty boxes
      </div>
      <div
        className="account-form-success"
        style={{ display: `${successDisplay}` }}
      >
        User was created successfully
      </div>
    </div>
  );
}

export default LoginBox;
