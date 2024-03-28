import { createSlice } from "@reduxjs/toolkit";
import { TodoItem, todoFilters } from "../../interface/ITodo";

export interface TodoState {
  todoList: TodoItem[];
  selectedTodo: TodoItem[];
  activeTodo: todoFilters;
}

const initialState: TodoState = {
  todoList: [],
  selectedTodo: [],
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
    addSelectedTodo: (state, action) => {
      state.selectedTodo.push(action.payload);
    },
    deleteSelectedTodo: (state, action) => {
      state.selectedTodo = state.selectedTodo.filter(
        (item) => item.id !== action.payload.id
      );
    },
    changeActiveTodo: (state, action) => {
      state.activeTodo = action.payload;
    },
  },
});

export const { addTodo, addSelectedTodo, deleteSelectedTodo } =
  navigationSlice.actions;

export default navigationSlice.reducer;
