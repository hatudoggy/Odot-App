import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { todoFilters } from "../../interface/ITodo";

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
  };

  const filters: Filters[] = [
    {
      label: "All",
      key: "all",
    },
    {
      label: "D",
      key: "day",
    },
    {
      label: "W",
      key: "week",
    },
    {
      label: "M",
      key: "month",
    },
    {
      label: "ND",
      key: "notDue",
    },
  ];

  const changeActiveTodo = (newActiveTodo: todoFilters) => {
    dispatch({ type: "todo/changeActiveTodo", payload: newActiveTodo });
  };

  return (
    <div className="flex gap-3 py-5">
      {filters.map((filter, index) => (
        <button
          key={index + filter.key}
          className="rounded-2xl bg-gray-900 py-1 px-3 font-medium transition-all"
          style={{
            backgroundColor:
              filter.key === todoState.activeTodo
                ? "rgba(100, 125, 126, 1)"
                : "rgba(100, 125, 126, 0)",
          }}
          onClick={() => changeActiveTodo(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

function ToDoContainer() {
  return (
    <div className="py-2 flex flex-col gap-2">
      <ToDoCard />
    </div>
  );
}

function ToDoCard() {
  const todoState = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();
  console.log(todoState.todoList[0].title);

  return (
    <div className="p-3 bg-slate-700 w-full rounded-xl">
      {todoState.todoList[0].title}
    </div>
  );
}

export default ToDoTab;
