import { ComponentPropsWithoutRef } from "react";

export type InputType = {
  label?: string;
  id: string;
  className?: string;
  error?: string;
} & ComponentPropsWithoutRef<"input">;
