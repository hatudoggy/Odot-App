//Hooks
import { useDispatch } from "react-redux";
import { ReactNode, FormEvent, useState } from "react";
import { SingleValue, MultiValue } from "react-select";

//Components
import InlineTextInput from "../InlineTextInput";
import InlineTextAreaInput from "../InlineTextArea";
import InlineSelectable, { SelectOption } from "../InlineSelectable";
import { LabeledInput } from "../../components/modals/RepoAddModal";

//Icons
import { PiTextTBold } from "react-icons/pi";
import { RiErrorWarningLine } from "react-icons/ri";
import { CgCalendarDates } from "react-icons/cg";

//Redux
import { closeModal } from "../../features/modal/modalSlice";

//DB
import { TodoItem, db } from "../../localdb/db";
import { useLiveQuery } from "dexie-react-hooks";

import { todoPriority, todoTags } from "../../interface/ITodo";

function TodoAddModal() {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  );

  const dispatch = useDispatch();

  const handleAddTodo = (todoItem: TodoItem) => {
    db.todo.add({
      title: todoItem.title,
      startDate: todoItem.startDate,
      endDate: todoItem.endDate,
      tags: todoItem.tags,
      priority: todoItem.priority,
      note: todoItem.note,
      completed: todoItem.completed,
    });
  };

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const todoTitle = formData.get("todoTitle")!.toString();
    const todoStartDate = new Date(formData.get("todoStartDate")!.toString());
    const todoEndDate = new Date(formData.get("todoEndDate")!.toString());
    const todoTags = [formData.get("todoTags") as todoTags];
    const todoPriority = formData
      .get("todoPriority")!
      .toString() as todoPriority;
    const todoNote = formData.get("todoNote")?.toString();
    const todoCompleted = false;

    const formPayload: TodoItem = {
      title: todoTitle,
      startDate: todoStartDate,
      endDate: todoEndDate,
      tags: todoTags,
      priority: todoPriority,
      note: todoNote,
      completed: todoCompleted,
    };

    handleAddTodo(formPayload);
    dispatch(closeModal());
  };

  const checkDateValidity = (start: Date, end: Date) => {
    return start.getTime() > end.getTime()
      ? "border-b-red-500 border-opacity-70"
      : "";
  };

  return (
    <div className="w-screen p-7 xl:max-w-xl max-w-lg">
      <form onSubmit={handleFormSubmission} className="flex flex-col gap-5">
        <LabeledInput
          className="text-lg"
          name="todoTitle"
          icon={<PiTextTBold />}
          type="line"
          label="Title"
        />

        {/* Start and End Date of the To Do */}
        <section className="grid grid-cols-2 gap-4">
          <LabeledInput
            className={`text-lg ${checkDateValidity(startDate, endDate)}`}
            name="todoStartDate"
            icon={<CgCalendarDates />}
            type="calendar"
            label="Start Date"
            showTimeSelect
            onChange={(e) => setStartDate(e)}
            date={startDate}
          />
          <LabeledInput
            className={`text-lg ${checkDateValidity(startDate, endDate)}`}
            name="todoEndDate"
            icon={<CgCalendarDates />}
            type="calendar"
            label="End Date"
            showTimeSelect
            onChange={(e) => setEndDate(e)}
            date={endDate}
          />
        </section>

        {/* Start and End Date Error */}
        <span
          className={
            "transition-all flex gap-1.5 items-center justify-center bg-red-500 bg-opacity-30 font-semibold p-2 rounded-md shadow-md " +
            (checkDateValidity(startDate, endDate) !== "" ? "block" : "hidden")
          }
        >
          <RiErrorWarningLine className="w-5 h-5" />
          Start Date cannot be after End Date
        </span>
      </form>
    </div>
  );
}

export default TodoAddModal;
