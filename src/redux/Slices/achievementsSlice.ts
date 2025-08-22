import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OurAchievementsCard } from "../../types/About/AboutType";

interface AchievementsState {
  items: OurAchievementsCard[];
  loading: boolean;
  error: string | null;
}

const initialState: AchievementsState = {
  items: [],
  loading: false,
  error: null,
};

const achievementsSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {
    setAchievements: (state, action: PayloadAction<OurAchievementsCard[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setAchievementsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAchievementsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setAchievements, setAchievementsLoading, setAchievementsError } = achievementsSlice.actions;
export default achievementsSlice.reducer;
