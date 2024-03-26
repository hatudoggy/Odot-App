import { createSlice } from "@reduxjs/toolkit";
import { TodoItem, todoFilters } from "../../interface/ITodo";

export interface TodoState {
  todoList: TodoItem[];
  activeTodo: todoFilters;
}

const initialState: TodoState = {
  todoList: [],
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
        status: action.payload.status,
      });
    },
    changeActiveTodo: (state, action) => {
      state.activeTodo = action.payload;
    },
  },
});

export const { addTodo } = navigationSlice.actions;

export default navigationSlice.reducer;
