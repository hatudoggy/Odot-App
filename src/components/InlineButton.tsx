import { ReactNode } from "react"

interface InlineButtonProps {
  children?: ReactNode
  className?: string
  size?: 'na' | 'sm' | 'md' | 'lg'
  active?: boolean
  onClick?: () => void
}

function InlineButton({children, className, size = 'md', active, onClick}: InlineButtonProps) {

  const buttonSizeStyle = {
    na: '',
    sm: 'text-sm',
    md: 'text-base px-2 py-1.5',
    lg: 'text-lg',
  }

  return(
    <button
      className={`z-30 rounded ${active ? 'bg-zinc-500 hover:bg-white hover:bg-opacity-30' : 'hover:bg-white hover:bg-opacity-10'} ${buttonSizeStyle[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default InlineButton