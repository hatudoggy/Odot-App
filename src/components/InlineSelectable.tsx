//Hooks
import { ReactNode } from "react";
import Creatable, { useCreatable } from "react-select/creatable";
import { Props as CreatableProps, OnChangeValue } from "react-select";
import { KeyOfIconList } from "./DynamicIcon";

export interface SelectOption {
  value: string;
  label: string;
  icon?: KeyOfIconList;
  color?: string;
}

interface InlineSelectableProps<
  OptionType extends SelectOption,
  IsMulti extends boolean
> {
  name?: string;
  className: string;
  isMulti: IsMulti;
  placeholder?: string;
  options: OptionType[];
  onChange:
    | ((newValue: OnChangeValue<OptionType, IsMulti>) => void)
    | undefined;
  onCreateOption?: (createdOption: string) => void | undefined;
  value?: OptionType | OptionType[];
  defaultValue?: OptionType | OptionType[];
}

function InlineSelectable<
  OptionType extends SelectOption,
  IsMulti extends boolean
>({
  name,
  className,
  isMulti,
  placeholder,
  options,
  onChange,
  onCreateOption,
  value,
  defaultValue,
}: InlineSelectableProps<OptionType, IsMulti>) {
  return (
    <Creatable
      name={name}
      unstyled
      maxMenuHeight={190}
      isMulti={isMulti}
      className={`border-b border-white border-opacity-20 rounded-t transition-colors hover:bg-opacity-5 hover:bg-white ${className}`}
      classNames={{
        menuList: () => "",
        control: () => "px-2 py-1.5",
        valueContainer: () => "gap-1.5",
        multiValue: () => "text-base px-1.5 bg-zinc-600 rounded",
        indicatorSeparator: () => "mr-1.5 my-0.5 bg-white bg-opacity-20",
        menu: () => "py-2 bg-zinc-700 rounded-b-lg",
        option: (state) =>
          `px-3 py-1.5 hover:bg-opacity-5 hover:bg-white ${
            state.isFocused && "bg-opacity-10 bg-white"
          }`,
      }}
      menuPortalTarget={document.body}
      styles={{
        multiValue: (baseStyle, { data }) => ({
          ...baseStyle,
          backgroundColor: data.color,
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      defaultValue={defaultValue}
      value={value}
      onCreateOption={onCreateOption}
    />
  );
}

export default InlineSelectable;
