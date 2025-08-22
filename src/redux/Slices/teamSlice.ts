import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TeamMember } from "../../types/About/AboutType";

interface TeamState {
  items: TeamMember[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  items: [],
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<TeamMember[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setTeamLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTeamError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setTeam, setTeamLoading, setTeamError } = teamSlice.actions;
export default teamSlice.reducer;
