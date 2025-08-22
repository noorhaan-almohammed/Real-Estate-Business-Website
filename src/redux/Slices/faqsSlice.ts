import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FaqItem } from "../../types/Home/HomeTypes";

interface FaqsState {
  items: FaqItem[];
  loading: boolean;
  error: string | null;
}

const initialState: FaqsState = {
  items: [],
  loading: false,
  error: null,
};

const faqsSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    setFaqs: (state, action: PayloadAction<FaqItem[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setFaqsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFaqsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setFaqs, setFaqsLoading, setFaqsError } = faqsSlice.actions;
export default faqsSlice.reducer;
