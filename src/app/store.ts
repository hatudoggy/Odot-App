import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../features/modal/modalSlice";
import navigationSlice from "../features/navigation/navigationSlice";
import notesSlice from "../features/notes/notesSlice";
import scheduleSlice from "../features/schedule/scheduleSlice";
import repoSlice from "../features/repo/repoSlice";
import todoSlice from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    navigation: navigationSlice,
    notes: notesSlice,
    schedule: scheduleSlice,
    repo: repoSlice,
    todo: todoSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
