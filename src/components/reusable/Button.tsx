import { ButtonType } from "../../utils/types/button";
export default function Button({
  label,
  className,
  onClick,
  ...props
}: ButtonType) {
  return (
    <div className="button-wrapper">
      <label>{label}</label>
      <button className={className} onClick={onClick} {...props}></button>
    </div>
  );
}
