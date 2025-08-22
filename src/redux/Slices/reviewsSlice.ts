import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Review {
  id: string;
  name: string;
  title: string;
  description: string;
  rating: number;
  profileimage: string;
  city: string;
  country: string;
  createdAt: number;
  updatedAt?: number;
}

interface ReviewsState {
  items: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  items: [],
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setReviews, setLoading, setError } = reviewsSlice.actions;
export default reviewsSlice.reducer;
