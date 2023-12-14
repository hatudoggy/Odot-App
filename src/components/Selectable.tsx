import Select, { Props } from "react-select"


function Selectable<Option, IsMulti extends boolean = false>(props: Props<Option, IsMulti>) {
  

  return(
    <Select 
      unstyled
      className={`bg-neutral-800 rounded ${props.className} `}
      classNames={{
        container: (state) => `${state.isFocused ? 'outline outline-2 outline-offset-1 outline outline-blue-400/70' : ''}`,
        valueContainer: () => 'px-2 py-0.5',
        indicatorsContainer: () => 'px-1',
        dropdownIndicator: () => 'px-0.5 w-5 h-5',
        menu: () => 'mt-1 py-1.5 bg-[#363636] rounded shadow-lg',
        option: (state) => (`px-2 py-1.5 ${state.isFocused ? 'bg-white bg-opacity-40' : ''}`)
      }}
      isSearchable={false}
      options={props.options}
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default Selectable