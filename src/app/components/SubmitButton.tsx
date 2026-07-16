import { useFormStatus } from "react-dom";
import type { ComponentProps, ReactNode } from "react";

interface SubmitButtonProps extends ComponentProps<"button"> {
  pendingText?: string;
  icon?: ReactNode;
}

export function SubmitButton({
  children,
  pendingText = "Submitting…",
  icon,
  className = "",
  disabled,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={`brutal-btn inline-flex items-center gap-2 px-5 py-3 font-display font-bold disabled:opacity-50 ${className}`}{...props}>
      {icon}
      {pending ? pendingText : children}
    </button>
  );
}
