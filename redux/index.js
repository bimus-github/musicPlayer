import { configureStore } from "@reduxjs/toolkit";
import audioSlice from "./Audios";

export const store = configureStore({
  reducer: {
    audioSlice,
  },
});
