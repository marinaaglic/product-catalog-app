import { ComponentPropsWithoutRef } from "react";

export type ButtonType = {
  label?: string;
  className?: string;
  onClick?: () => void;
} & ComponentPropsWithoutRef<"button">;
