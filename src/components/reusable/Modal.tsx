import { ReactElement } from "react";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactElement;
}

export default function Modal({}: ModalProps) {
  return <div>Modal</div>;
}
