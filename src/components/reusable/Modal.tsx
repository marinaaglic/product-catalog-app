import { ReactElement } from "react";
import "../../styles/_modal.scss";

interface ModalProps {
  title: string;
  buttonText: string;
  open: boolean;
  onClose: () => void;
  children: ReactElement;
}

export default function Modal({
  title,
  buttonText,
  open,
  onClose,
  children,
}: ModalProps) {
  return (
    <div className={`${"modal"} ${open ? "display-block" : "display-none"}`}>
      <div className="modal-main">
        <div className="modal-head">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">{children}</div>
        <div className="btn-close" onClick={onClose}>
          {buttonText}
        </div>
      </div>
    </div>
  );
}
