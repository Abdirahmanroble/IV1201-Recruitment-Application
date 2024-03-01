import { useState, useEffect } from "react";
import { LoginBoxProps } from "../../@types/Login";
import FormInput from "../FormInput/FormInput";
import "./LoginBox.css";
// import { set } from "mobx";

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
  //const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    console.log("Updated Error Message: " + errorMessage);
  }, [errorMessage]);
  //let invalidCredentials = "none";
  let displayError = errorMessage ? "block" : "none";
  //emptyBox = "none";
  /*if ((email === "" || password === "") && counter > 0); emptyBox = "block";
  else */
  //if (success === false && counter > 0) invalidCredentials = "block";

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
            try {
              const userWasLoggedIn = await props.onLogin(email, password);
              console.log(userWasLoggedIn);
              setCounter(counter + 1);
            //  setSuccess(userWasLoggedIn);
            } catch (error) {
              if (error instanceof Error) {
                setErrorMessage(error.message);
                console.log("Login Box: " + errorMessage);
                console.log("ErrorMessage" + error.message);
              } else
                setErrorMessage("An unknown error occurred, please try again.");
            }
          }}
        >
          LOGIN
        </button>
      </div>
      <div
        className="login-box-error"
        style={{ display: `${displayError}` }}
      >
        {errorMessage}
      </div>
      {/* <div className="login-box-error" style={{ display: `${"block"}` }}>
        Please fill in the empty boxes
       
        </div>)*/}
    </div>
  );
}

export default LoginBox;
