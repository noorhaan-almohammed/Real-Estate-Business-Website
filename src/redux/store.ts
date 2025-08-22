import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/themeSlice";
import propertiesReducer from "./Slices/propertiesSlice"
import reviewsReducer from "./Slices/reviewsSlice"
import faqsReducer from "./Slices/faqsSlice"
import achievementsReducer from "./Slices/achievementsSlice"
import teamReducer from "./Slices/teamSlice"
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    properties: propertiesReducer,
    reviews: reviewsReducer,
    faqs: faqsReducer,
    achievements: achievementsReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
