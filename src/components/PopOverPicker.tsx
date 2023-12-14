import { useFloating } from "@floating-ui/react";
import { Popover } from "@headlessui/react";
import { ReactNode } from "react";


export type PickerOptions = Record<string, ReactNode>

export interface PopOverPickerProps {
  buttonElement: ReactNode
  panelElement?: ReactNode
  options: PickerOptions
  onSelect: (selected: string) => void
}

function PopOverPicker({buttonElement, panelElement, options, onSelect}: PopOverPickerProps) {

  const {refs, floatingStyles} = useFloating({
    
  })

  return(
    <Popover className='flex items-center'>
      <Popover.Button ref={refs.setReference} className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
        {buttonElement}
      </Popover.Button>

      <Popover.Panel ref={refs.setFloating} style={floatingStyles} className="w-40 p-4 bg-zinc-600 shadow-md rounded">
        <DefaultPickerPanel 
          options={options} 
          onSelect={onSelect}
        />
        {panelElement}
      </Popover.Panel>
    </Popover>
  )
}

interface DefaultPickerPanelProps{
  options: PickerOptions
  onSelect: (selected: string) => void
}

function DefaultPickerPanel({options, onSelect}:DefaultPickerPanelProps) {

  return(
    <div
      className="grid grid-cols-4 place-content-center gap-1.5"
    >
      {
        Object.entries(options).map(([key, value])=>
          <PickerOption key={key} option={value} onClick={()=>onSelect(key)} />
        )
      }
    </div>
  )
}

interface PickerOptionProps {
  option: ReactNode
  onClick?: () => void
}

function PickerOption({option, onClick}: PickerOptionProps) {

  return(
    <button
      className=" grid place-content-center aspect-square text-lg hover:bg-white hover:bg-opacity-25 rounded-sm"
      onClick={onClick}
    >
      {option}
    </button>
  )
}

export default PopOverPicker