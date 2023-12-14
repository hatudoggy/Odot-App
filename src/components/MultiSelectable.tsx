import Select, { Props } from "react-select"


function MultiSelectable<Option, IsMulti extends boolean = true>(props: Props<Option, IsMulti>) {
  

  return(
    <Select 
      unstyled
      isMulti={props.isMulti}
      components={props.components}
      className={`bg-neutral-800 rounded ${props.className} `}
      classNames={{
        container: (state) => `${state.isFocused ? 'h-full outline outline-2 outline-offset-1 outline outline-blue-400/70' : ''}`,
        control: () => 'h-[4.5rem] min-h-[4.5rem] justify-start',
        valueContainer: () => 'px-2 py-1.5 gap-1.5',
        indicatorsContainer: () => 'px-1 py-1.5 h-fit',
        dropdownIndicator: () => 'px-0.5 w-5 h-5',
        menu: () => 'mt-1 py-1.5 bg-[#363636] rounded shadow-lg',
        multiValue: () => 'text-base px-1.5 bg-zinc-600 rounded',
        option: (state) => (`px-2 py-1.5 ${state.isFocused ? 'bg-white bg-opacity-40' : ''}`),
        placeholder: () => 'text-sm opacity-30'
      }}
      styles={{
        control: (styles) => ({
            ...styles,
            alignItems: 'flex-start'
        })
      }}
      isSearchable={false}
      placeholder='Select one or more options...'
      options={props.options}
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default MultiSelectable