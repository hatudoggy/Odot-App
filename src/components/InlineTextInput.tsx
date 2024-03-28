
interface InlineTextInputProps {
  name?: string
  type: string
  className?: string
  placeholder?: string
  defaultValue?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function InlineTextInput({name, type, className, placeholder, defaultValue, value, onChange}: InlineTextInputProps) {

  return(
    <input 
      name={name}
      type={type}
      className={`px-2 py-1.5 bg-transparent border-b border-white border-opacity-20 rounded-t transition-colors hover:bg-opacity-5 hover:bg-white focus:outline-none ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default InlineTextInput