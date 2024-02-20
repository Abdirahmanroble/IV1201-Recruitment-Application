import { FormInputProps } from "../../@types/CreateAccount";
import "./FormInput.css";

function FormInput(props: FormInputProps) {
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
