import { ReactNode } from "react";
type Item = { value: string; id: string; label?: ReactNode };
export function RadioGroup({ defaultValue, onValueChange, className = "", children }:{ defaultValue?: string; onValueChange?: (v:string)=>void; className?: string; children: ReactNode; }) {
  return <div className={className} onChange={(e:any)=>onValueChange && onValueChange(e.target?.value)}>{children}</div>
}
export function RadioGroupItem({ value, id }:{ value: string; id: string }) {
  return <input type="radio" name="rg" id={id} value={value} className="mr-1 align-middle" defaultChecked={id===value} />;
}
