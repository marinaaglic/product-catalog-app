import { forwardRef } from "react";
import { InputType } from "../../utils/types/input";
import "../../styles/_input.scss";

function Input(
  { label, id, error, ...props }: InputType,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>
        {label}
        <span className="error-message-input">{error ? `(${error})` : ""}</span>
      </label>
      <input id={id} name={id} ref={ref} {...props} />
    </div>
  );
}

export default forwardRef(Input);
