
interface TextInputProps {
  type: string
  className?: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function TextInput({type, className, placeholder, value, onChange}: TextInputProps) {

  return(
    <input 
      type={type}
      className={`p-2 rounded-lg focus:outline-none focus:ring-2  focus:border-slate-600 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      spellCheck="false"
    />
  )
}

export default TextInput