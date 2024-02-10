import { createSlice } from "@reduxjs/toolkit";
import { TodoItem, todoFilters } from "../../interface/ITodo";

export interface TodoState {
  todoList: TodoItem[];
  activeTodo: todoFilters;
}

const initialState: TodoState = {
  todoList: [
    {
      id: 0,
      title: "1st Todoooooooooooooooooooooooooooooooooooooooooooooooooooooo",
      startDate: new Date(),
      endDate: new Date(),
      tags: ["work"],
      priority: "low",
      note: "This is my note",
      completed: false,
    },
    {
      id: 1,
      title: "2nd Todo",
      startDate: new Date(),
      endDate: new Date(),
      tags: ["work"],
      priority: "low",
      note: "This is my note",
      completed: false,
    },
    {
      id: 2,
      title: "3rd Todo",
      startDate: new Date(),
      endDate: new Date(),
      tags: ["work"],
      priority: "low",
      note: "This is my note",
      completed: false,
    },
    {
      id: 3,
      title: "4th Todo",
      startDate: new Date(),
      endDate: new Date(),
      tags: ["work"],
      priority: "low",
      note: "This is my note",
      completed: false,
    },
  ],
  activeTodo: "all",
};

export const navigationSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push({
        id: state.todoList.length,
        title: action.payload.title,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        tags: action.payload.tags,
        priority: action.payload.priority,
        note: action.payload.note,
        completed: false,
      });
    },
    changeActiveTodo: (state, action) => {
      state.activeTodo = action.payload;
    },
  },
});

export const { addTodo } = navigationSlice.actions;

export default navigationSlice.reducer;
