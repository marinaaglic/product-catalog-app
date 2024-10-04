import { ButtonType } from "../../utils/types/button";
export default function Button({
  label,
  className,
  onClick,
  variant = "primary",
  ...props
}: ButtonType) {
  const variantClass = `btn-${variant}`;
  return (
    <div className="button-wrapper">
      <label>{label}</label>
      <button
        className={`${className} ${variantClass}`}
        onClick={onClick}
        {...props}
      ></button>
    </div>
  );
}
