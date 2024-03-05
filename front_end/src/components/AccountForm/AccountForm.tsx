import { useState, useEffect } from "react";
import { AccountFormProps } from "../../@types/CreateAccount";
import FormInput from "../FormInput/FormInput";
import readErrorMsg from "../../errors/Error";
import { useTranslation } from "react-i18next";
import "./AccountForm.css";

/**
 * Represents a form for creating a new user account.
 *
 * @param {AccountFormProps} props - The properties for the account form component.
 * @param {Function} props.onCreateAccount - The function to handle the creation of a new account.
 * @returns {JSX.Element} The rendered account form component.
 */
function LoginBox(props: AccountFormProps): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [personNumber, setPersonNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(0);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { t } = useTranslation();

  let errorDisplay = "none",
    successDisplay = "none";
  if (success === false && counter > 0) errorDisplay = "block";
  else if (success === true && counter > 0) successDisplay = "block";

  return (
    <div className="account-form-container">
      <div className="account-form-header">{t("createAccount")}</div>
      <div className="account-form-input">
        <FormInput
          text={t("firstName") + "*"}
          type="text"
          value={firstName}
          onChange={setFirstName}
          counter={counter}
        />
        <FormInput
          text={t("lastName") + "*"}
          type="text"
          value={lastName}
          onChange={setLastName}
          counter={counter}
        />
        <FormInput
          text={t("email") + "*"}
          type="email"
          value={email}
          onChange={setEmail}
          counter={counter}
        />
        <FormInput
          text={t("personNumber")}
          type="text"
          value={personNumber}
          onChange={setPersonNumber}
          counter={0}
        />
        <FormInput
          text={t("username") + "*"}
          type="text"
          value={username}
          onChange={setUsername}
          counter={counter}
        />
        <FormInput
          text={t("password") + "*"}
          type="password"
          value={password}
          onChange={setPassword}
          counter={counter}
        />
      </div>
      <div className="account-form-buttons">
        <button
          onClick={async () => {
            try {
              const userWasCreated = await props.onCreateAccount(
                firstName,
                lastName,
                email,
                personNumber,
                username,
                password
              );
              console.log(userWasCreated)
              setCounter(counter + 1);
            //  setSuccess(userWasCreated);
            } catch (error) {
              if (error instanceof Error) {
                setErrorMessage(error.message);
              } else
                setErrorMessage("An unknown error occurred, please try again.");
            }
            
          }}
        >
          {t("createAccountButton")}
        </button>
      </div>
      <div className="account-form-error" style={{ display: errorDisplay }}>
        {readErrorMsg(props.getCurrentError())}
      </div>
      <div className="account-form-success" style={{ display: successDisplay }}>
        {t("userCreatedSuccess")}
      </div>
    </div>
  );
}

export default LoginBox;
