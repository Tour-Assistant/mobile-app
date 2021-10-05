import { configureStore } from "@reduxjs/toolkit";
import tourReducer from "./reducer/tourReducer";

export const store = configureStore({
  reducer: {
    tourState: tourReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
