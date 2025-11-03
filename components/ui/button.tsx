import { ButtonHTMLAttributes } from "react";
export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return <button className={`px-4 py-2 rounded-xl shadow-sm bg-gray-800 text-white hover:opacity-90 transition ${className}`} {...props} />;
}
