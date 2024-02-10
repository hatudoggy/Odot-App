//Hooks
import { useDispatch } from "react-redux";
import { ReactNode, FormEvent, useState } from "react";
import { SingleValue, MultiValue } from "react-select";

//Components
import InlineTextInput from "../InlineTextInput";
import InlineTextAreaInput from "../InlineTextArea";
import InlineSelectable, { SelectOption } from "../InlineSelectable";

//Icons

//Redux
import { closeModal } from "../../features/modal/modalSlice";

//DB
import { TodoItem, db } from "../../localdb/db";
import { useLiveQuery } from "dexie-react-hooks";

import { todoPriority, todoTags } from "../../interface/ITodo";

function TodoAddModal() {
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

  return (
    <div className="w-screen ">
      <form onSubmit={handleFormSubmission}>
        
      </form>
    </div>
  );
}

export default TodoAddModal;
