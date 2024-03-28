//Hooks
import { useDispatch, useSelector } from "react-redux";
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
import {
  addTitle,
  addEndDate,
  addNote,
  addPriority,
  addStartDate,
  addStatus,
  addTags,
} from "../../features/todo/todoSlice";
import { RootState } from "../../app/store";

//DB
import { TodoItem, db } from "../../localdb/db";
import { useLiveQuery } from "dexie-react-hooks";

import {
  todoPriority,
  todoStatus,
  todoTags,
  TodoItem as ITodoItem,
} from "../../interface/ITodo";

function TodoAddModal() {
  const dispatch = useDispatch();
  const toAddTodoState = useSelector(
    (state: RootState) => state.todo.toAddTodo
  );

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
      note: todoNote || "",
      status: todoStatus,
    };

    handleAddTodo(formPayload);
    dispatch(closeModal());
  };

  const checkDateValidity = (
    start: ITodoItem["startDate"],
    end: ITodoItem["endDate"]
  ) => {
    return new Date(start).getTime() > new Date(end).getTime()
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
          value={toAddTodoState.title}
          onChange={(e) => dispatch(addTitle(e.target.value))}
        />

        {/* Start and End Date of the To Do */}
        <section className="grid grid-cols-2 gap-4">
          <LabeledInput
            className={`text-lg ${checkDateValidity(
              toAddTodoState?.startDate,
              toAddTodoState?.endDate
            )}`}
            name="todoStartDate"
            icon={<CgCalendarDates />}
            type="calendar"
            label="Start Date"
            showTimeSelect
            onChange={(e) => dispatch(addStartDate(e.getTime()))} // Serialize before dispatching
            date={toAddTodoState.startDate}
          />
          <LabeledInput
            className={`text-lg ${checkDateValidity(
              toAddTodoState?.startDate,
              toAddTodoState?.endDate
            )}`}
            name="todoEndDate"
            icon={<CgCalendarDates />}
            type="calendar"
            label="End Date"
            showTimeSelect
            onChange={(e) => dispatch(addEndDate(e.getTime()))} // Serialize before dispatching
            date={toAddTodoState.endDate}
          />
        </section>

        {/* Start and End Date Error */}
        <span
          className={
            "transition-all flex gap-1.5 items-center justify-center bg-red-500 bg-opacity-30 font-semibold p-2 rounded-md shadow-md " +
            (checkDateValidity(
              toAddTodoState.startDate,
              toAddTodoState.endDate
            ) !== ""
              ? "block"
              : "hidden")
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
            value={
              toAddTodoState?.priority
                ? {
                    value: toAddTodoState?.priority,
                    label:
                      toAddTodoState?.priority[0]?.toUpperCase() +
                      toAddTodoState?.priority?.slice(1),
                  }
                : undefined
            }
            onChange={(e) => dispatch(addPriority(e?.value))}
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
            value={
              toAddTodoState?.tags
                ? toAddTodoState.tags.map((tag) => {
                    return {
                      value: tag,
                      label: tag[0].toUpperCase() + tag.slice(1),
                    };
                  })
                : undefined
            }
            onChange={(e) =>
              e && dispatch(addTags([...e?.map((tag) => tag.value)]))
            }
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
          value={
            toAddTodoState?.status
              ? {
                  value: toAddTodoState.status,
                  label:
                    toAddTodoState.status[0].toUpperCase() +
                    toAddTodoState.status.slice(1),
                }
              : undefined
          }
          onChange={(e) => dispatch(addStatus(e?.value))}
          onCreateOption={(createdOption) => {}}
        />
        <LabeledInput
          name="todoNote"
          icon={<PiTextTBold />}
          type="area"
          label="Note"
          value={toAddTodoState.note}
          onChange={(e) => dispatch(addNote(e.target.value))}
        />
        <section className="grid grid-cols-2 gap-2">
          <button
            type="submit"
            className="bg-zinc-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-zinc-600 transition-colors"
          >
            Add To Do
          </button>
          <button
            onClick={() => {
              dispatch(closeModal());
            }}
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
