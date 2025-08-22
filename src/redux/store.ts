import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/themeSlice";
import propertiesReducer from "./Slices/propertiesSlice"
import reviewsReducer from "./Slices/reviewsSlice"
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    properties: propertiesReducer,
    reviews: reviewsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
