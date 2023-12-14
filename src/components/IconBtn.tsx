import { ReactNode, MouseEvent, forwardRef } from 'react'

interface IconBtnProps{
  iconElement: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string
  disabled?: boolean
}

const IconBtn = forwardRef<HTMLButtonElement, IconBtnProps>(({iconElement, onClick, className, disabled}: IconBtnProps, ref) => {

  return(
    <button
      ref={ref}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {iconElement}
    </button>
  )
})

export default IconBtn