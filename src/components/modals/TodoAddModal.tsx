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

import { todoPriority, todoStatus, todoTags } from "../../interface/ITodo";

function TodoAddModal() {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  );

  const [tags, setTags] = useState<SelectOption[]>([]);

  const [priority, setPriority] = useState<SelectOption | null>(null);

  const [status, setStatus] = useState<SelectOption | null>(null);

  const dispatch = useDispatch();

  const handleAddTodo = (todoItem: TodoItem) => {
    db.todo.add({
      title: todoItem.title,
      startDate: todoItem.startDate,
      endDate: todoItem.endDate,
      tags: todoItem.tags,
      priority: todoItem.priority,
      note: todoItem.note,
      status: todoItem.status,
    });
  };

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const todoTitle = formData.get("todoTitle")!.toString();
    const todoStartDate = new Date(formData.get("todoStartDate")!.toString());
    const todoEndDate = new Date(formData.get("todoEndDate")!.toString());
    const todoTags = [formData.get("todoTags")] as todoTags[];
    const todoPriority = formData
      .get("todoPriority")!
      .toString() as todoPriority;
    const todoNote = formData.get("todoNote")?.toString();
    const todoStatus =
      (formData.get("todoStatus")?.toString() as todoStatus) || "not started";

    const formPayload: TodoItem = {
      title: todoTitle,
      startDate: todoStartDate,
      endDate: todoEndDate,
      tags: todoTags,
      priority: todoPriority,
      note: todoNote,
      status: todoStatus,
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

        {/* Priority and Tags */}

        <section className="grid grid-cols-2 gap-4">
          <LabeledInput
            className="text-lg"
            name="todoPriority"
            icon={<PiTextTBold />}
            type="select"
            label="Priority"
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
            onChange={(e) => setPriority(e)}
            onCreateOption={(createdOption) => {}}
          />
          <LabeledInput
            className="text-lg"
            name="todoTags"
            icon={<PiTextTBold />}
            type="multiple"
            label="Tags"
            options={[
              { value: "work", label: "Work" },
              { value: "school", label: "School" },
              { value: "personal", label: "Personal" },
              { value: "other", label: "Other" },
            ]}
            onChange={(e) => e && setTags([...e])}
            onCreateOption={(createdOption) => {}}
          />
        </section>
        <LabeledInput
          name="todoStatus"
          icon={<PiTextTBold />}
          type="select"
          label="Status"
          options={[
            { value: "completed", label: "Completed" },
            { value: "in progress", label: "In Progress" },
            { value: "not started", label: "Not Started" },
          ]}
          onChange={(e) => setStatus(e)}
          onCreateOption={(createdOption) => {}}
        />
        <LabeledInput
          name="todoNote"
          icon={<PiTextTBold />}
          type="area"
          label="Note"
        />
        <section className="grid grid-cols-2 gap-2">
          <button
            type="submit"
            className="bg-zinc-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-zinc-600 transition-colors"
          >
            Add To Do
          </button>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-white font-semibold py-2 rounded-md hover:bg-zinc-600 transition-colors"
          >
            Cancel
          </button>
        </section>
      </form>
    </div>
  );
}

export default TodoAddModal;
