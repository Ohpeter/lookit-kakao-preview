import { LabelHTMLAttributes, ReactNode } from "react";
export function Label({ children, ...props }: LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode }) {
  return <label {...props} className={`text-sm font-medium ${props.className || ""}`}>{children}</label>;
}
