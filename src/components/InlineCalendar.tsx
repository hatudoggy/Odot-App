//Hooks
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InlineCalendarProps {
  name?: string;
  className?: string;
  date: Date | number;
  showTimeSelect?: boolean;
  onChange: (date: Date) => void;
}

function InlineCalendar(props: InlineCalendarProps) {
  return (
    <Datepicker
      name={props.name}
      className={`px-2 py-1.5 w-full bg-transparent border-b border-white border-opacity-20 rounded-t transition-colors hover:bg-opacity-5 hover:bg-white focus:outline-none ${props.className}`}
      selected={new Date(props.date)} // Convert to Date object so it can be read by the Datepicker
      showTimeSelect={props.showTimeSelect}
      onChange={props.onChange}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
}

export default InlineCalendar;
