import { FormInputProps } from "../../@types/CreateAccount";
import "./FormInput.css";

/**
 * Represents a form input component used for collecting user input.
 *
 * @param {FormInputProps} props - The properties passed to the FormInput component.
 * @returns {JSX.Element} The rendered form input component.
 */
function FormInput(props: FormInputProps): JSX.Element {
  let color = "",
    borderColor = "";
  if (props.value === "" && props.counter > 0) {
    color = "var(--red-secondary)";
    borderColor = "var(--red-primary)";
  } else {
    color = "var(--green-tetriary)";
    borderColor = "var(--green-primary)";
  }

  return (
    <div className="form-input-container">
      <div>{props.text}</div>
      <input
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        style={{
          backgroundColor: `${color}`,
          border: `0.1rem solid ${borderColor}`,
        }}
      ></input>
    </div>
  );
}

export default FormInput;
