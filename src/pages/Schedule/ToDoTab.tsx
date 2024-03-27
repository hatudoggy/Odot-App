import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { todoFilters } from "../../interface/ITodo";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineAdd } from "react-icons/md";
import { dateTimeFormatter } from "../../hooks/reusable code/dateFormatter";
import { openModal } from "../../features/modal/modalSlice";
import { useEffect } from "react";

// DB
import { db, TodoItem } from "../../localdb/db";

// Hooks
import { useLiveQuery } from "dexie-react-hooks";

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
      <MdOutlineAdd
        className="ml-auto w-8 h-8 p-1 rounded-md cursor-pointer"
        style={{ backgroundColor: "rgba(100, 125, 126, 1)" }}
        onClick={() => dispatch(openModal({ modal: "todoAdd" }))}
      />
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

  return (
    <>
      {todoQuery &&
        todoQuery.map((todo, index) => (
          <div
            className="py-3 px-5 w-full rounded-xl flex items-center gap-3 md:flex-[0_1_49%] lg:flex-[0_1_32%] xl:flex-[0_1_24%] truncate"
            style={{ backgroundColor: "rgba(100, 125, 126, 0.25)" }}
            key={index + todo.title}
          >
            <input type="checkbox" className="w-4 h-4" />
            <section className="px-1.5 truncate w-[90%]">
              <h1 className="text-lg font-semibold truncate max-w-[48vw]">
                {todo.title}
              </h1>
              <h5 className="truncate max-w-[48vw]">
                {dateTimeFormatter(todo.startDate)}
              </h5>
            </section>
          </div>
        ))}
    </>
  );
}

export default ToDoTab;
