import { createSlice } from "@reduxjs/toolkit";
import { TodoItem, todoFilters } from "../../interface/ITodo";

export interface TodoState {
  toAddTodo: TodoItem;
  todoList: TodoItem[];
  selectedTodo: TodoItem[];
  activeTodo: todoFilters;
}

const initialToAddTodo: TodoItem = {
  id: 0,
  title: "",
  startDate: new Date().getTime(), // Serialize before dispatching
  endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(), // Serialize before dispatching
  tags: [],
  priority: undefined,
  note: "",
  status: undefined,
};

const initialState: TodoState = {
  toAddTodo: initialToAddTodo,
  todoList: [],
  selectedTodo: [],
  activeTodo: "all",
};

export const navigationSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Add Todo
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
    addTitle: (state, action) => {
      state.toAddTodo.id = state.todoList.length;
      state.toAddTodo.title = action.payload;
    },
    addStartDate: (state, action) => {
      state.toAddTodo.startDate = action.payload;
    },
    addEndDate: (state, action) => {
      state.toAddTodo.endDate = action.payload;
    },
    addTags: (state, action) => {
      state.toAddTodo.tags = action.payload;
    },
    addPriority: (state, action) => {
      state.toAddTodo.priority = action.payload;
    },
    addNote: (state, action) => {
      state.toAddTodo.note = action.payload;
    },
    addStatus: (state, action) => {
      state.toAddTodo.status = action.payload;
    },
    resetToAddTodo: (state) => {
      state.toAddTodo = initialToAddTodo;
    },

    // Selected Todo
    addSelectedTodo: (state, action) => {
      state.selectedTodo.push(action.payload);
    },
    deleteSelectedTodo: (state, action) => {
      state.selectedTodo = state.selectedTodo.filter(
        (item) => item.id !== action.payload.id
      );
    },

    // Active Todo Tab
    changeActiveTodo: (state, action) => {
      state.activeTodo = action.payload;
    },
  },
});

export const {
  addTodo,
  addSelectedTodo,
  deleteSelectedTodo,
  addTitle,
  addStartDate,
  addEndDate,
  addPriority,
  addNote,
  addStatus,
  addTags,
  resetToAddTodo,
} = navigationSlice.actions;

export default navigationSlice.reducer;
