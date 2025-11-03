import { ReactNode } from "react";
export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`bg-white rounded-2xl border ${className}`}>{children}</div>;
}
export function CardContent({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
