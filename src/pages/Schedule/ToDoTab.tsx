import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { todoFilters } from "../../interface/ITodo";
import { AnimatePresence, motion } from "framer-motion";
import { dateTimeFormatter } from "../../hooks/reusable code/dateFormatter";
import { useEffect, useState } from "react";

// DB
import { db, TodoItem } from "../../localdb/db";

// Hooks
import { useLiveQuery } from "dexie-react-hooks";

// React icons
import { MdDelete } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
import { IoAccessibility } from "react-icons/io5";

// Redux
import {
  addSelectedTodo,
  deleteSelectedTodo,
} from "../../features/todo/todoSlice";
import { openModal } from "../../features/modal/modalSlice";

function ToDoTab() {
  return (
    <div className="">
      <ActionBar />
      <ToDoFilters />
      <ToDoContainer />
    </div>
  );
}

function ActionBar() {
  return <div></div>;
}

function ToDoFilters() {
  const todoState = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  type Filters = {
    label: string;
    key: todoFilters;
    expandedLabel: string;
  };

  const filters: Filters[] = [
    {
      label: "A",
      key: "all",
      expandedLabel: "All",
    },
    {
      label: "D",
      key: "day",
      expandedLabel: "Day",
    },
    {
      label: "W",
      key: "week",
      expandedLabel: "Week",
    },
    {
      label: "M",
      key: "month",
      expandedLabel: "Month",
    },
    {
      label: "ND",
      key: "notDue",
      expandedLabel: "Not Due",
    },
  ];

  const changeActiveTodo = (newActiveTodo: todoFilters) => {
    dispatch({ type: "todo/changeActiveTodo", payload: newActiveTodo });
  };

  type attributeType = "css" | "onclick";

  /**
   * Provides an onClick event for the delete button or
   * a CSS class for the delete button
   *
   * @param attribute - "css" or "onclick" to determine the return value
   * @returns - A string or void
   * */
  const checkedItemsPresent = (attribute: attributeType): string | void => {
    if (todoState.selectedTodo.length !== 0 && attribute === "onclick") {
      dispatch(
        openModal({ modal: "todoDelete", modalPayload: todoState.selectedTodo }) // Item to delete
      );
      return;
    }

    if (attribute === "css")
      return todoState.selectedTodo.length === 0
        ? "opacity-60 cursor-not-allowed"
        : "cursor-pointer";
  };

  return (
    <div className="flex gap-3 py-5 items-center">
      {filters.map((filter, index) => (
        <AnimatePresence>
          <motion.button
            key={index + filter.key}
            className="rounded-2xl bg-gray-900 py-1 px-3 font-medium"
            style={{
              backgroundColor:
                filter.key === todoState.activeTodo
                  ? "rgba(100, 125, 126, 1)"
                  : "rgba(100, 125, 126, 0)",
            }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            initial={{ backgroundColor: "rgba(100, 125, 126, 0)" }}
            animate={{
              backgroundColor:
                filter.key === todoState.activeTodo
                  ? "rgba(100, 125, 126, 1)"
                  : "rgba(100, 125, 126, 0)",
            }}
            exit={{ backgroundColor: "rgba(100, 125, 126, 0)" }}
            onClick={() => changeActiveTodo(filter.key)}
          >
            {filter.key === todoState.activeTodo
              ? filter.expandedLabel
              : filter.label}
          </motion.button>
        </AnimatePresence>
      ))}
      <span className="ml-auto flex gap-2">
        <MdDelete
          className={
            `transition-all ml-auto bg-red-500 bg-opacity-70 px-1 rounded-md h-8 w-8 font-medium ` +
            checkedItemsPresent("css")
          }
          onClick={() => checkedItemsPresent("onclick")}
        />
        <MdOutlineAdd
          className="ml-auto w-8 h-8 p-1 rounded-md cursor-pointer"
          style={{ backgroundColor: "rgba(100, 125, 126, 1)" }}
          onClick={() => dispatch(openModal({ modal: "todoAdd" }))}
        />
      </span>
    </div>
  );
}

function ToDoContainer() {
  return (
    <div className="py-2 flex flex-col gap-2 md:flex-row flex-wrap">
      <ToDoCard />
    </div>
  );
}

function ToDoCard() {
  const todoState = useSelector((state: RootState) => state.todo);
  const todoQuery = useLiveQuery(() => db.todo.toArray(), [todoState]);
  const dispatch = useDispatch();

  const handleSelectTodo = (
    e: React.MouseEvent<HTMLInputElement>,
    todo: TodoItem
  ) => {
    // Serialize the todo item to make it serializable
    const serializedTodo = {
      id: todo?.id,
      title: todo?.title,
      startDate: new Date(todo.startDate).getTime(),
      endDate: new Date(todo.endDate).getTime(),
      tags: todo?.tags,
      priority: todo?.priority,
      note: todo?.note,
      status: todo?.status,
    };

    if (e.currentTarget.checked) {
      dispatch(addSelectedTodo(serializedTodo));
      return;
    }

    // If the selected todo is unchecked, remove it from the selected todo list
    dispatch(deleteSelectedTodo(serializedTodo));
  };

  console.log(todoState.selectedTodo);

  return (
    <>
      {todoQuery &&
        todoQuery.map((todo, index) => (
          <div
            className="py-3 px-5 w-full rounded-xl flex items-center gap-3 md:flex-[0_1_49%] lg:flex-[0_1_32%] xl:flex-[0_1_24%] truncate"
            style={{ backgroundColor: "rgba(100, 125, 126, 0.25)" }}
            key={index + todo.title}
          >
            <input
              type="checkbox"
              className="w-4 h-4"
              onClick={(e) => handleSelectTodo(e, todo)}
            />
            <section className="px-1.5 truncate w-[90%]">
              <h1 className="text-lg font-semibold truncate max-w-[48vw]">
                {todo.title}
              </h1>
              <h5 className="truncate max-w-[48vw]">
                {dateTimeFormatter(new Date(todo.startDate))}
              </h5>
            </section>
          </div>
        ))}
    </>
  );
}

export default ToDoTab;
