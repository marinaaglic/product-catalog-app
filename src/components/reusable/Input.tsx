import { forwardRef } from "react";
import { InputType } from "../../utils/types/input";
import "../../styles/_input.scss";

function Input(
  { label, id, width, height, error, ...props }: InputType,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        width={width}
        height={height}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
