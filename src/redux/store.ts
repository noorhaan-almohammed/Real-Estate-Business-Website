import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/themeSlice";
import propertiesReducer from "./Slices/propertiesSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    properties: propertiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
