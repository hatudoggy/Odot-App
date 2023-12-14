import { ReactNode } from "react";


interface LabelProps {
  children?: ReactNode
  labelText: string
  className?: string
  classNameLabel?: string
}

function Label({children, labelText, className, classNameLabel}: LabelProps) {
  
  return(
    <div
      className={`flex flex-col gap-1 ${className}`}
    >
      <label
        className={`text-sm opacity-50 ${classNameLabel}`}
      >
        {labelText}
      </label>

      {children}

    </div>
  )
}

export default Label