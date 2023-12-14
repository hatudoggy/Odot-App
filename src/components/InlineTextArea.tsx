
interface InlineTextAreaProps {
  name?: string
  className?: string
  placeholder?: string
  rows?: number
  defaultValue?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}
  
function InlineTextAreaInput({name, className, placeholder, rows, defaultValue, value, onChange}: InlineTextAreaProps) {

  return(
    <textarea 
      name={name}
      className={`px-2 py-1.5 resize-none bg-transparent border-b border-white border-opacity-20 rounded-t transition-colors hover:bg-opacity-5 hover:bg-white focus:outline-none ${className}`}
      placeholder={placeholder}
      rows={rows}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    />
  )
}

export default InlineTextAreaInput