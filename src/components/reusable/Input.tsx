import { forwardRef } from "react";
import { InputType } from "../../utils/types/input";
import "../../styles/_input.scss";

function Input(
  { label, id, className, error, variant, ...props }: InputType,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={`input-wrapper ${className ? className : ""} ${variant}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} ref={ref} {...props} />
    </div>
  );
}

export default forwardRef(Input);
