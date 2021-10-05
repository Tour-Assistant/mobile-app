import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tour } from "../types/tourType";

export interface TourState {
  tourList: Tour[];
  filteredTourList: Tour[];
  selectedTour: Tour | undefined;
}

const initialState: TourState = {
  tourList: [],
  filteredTourList: [],
  selectedTour: undefined,
};

export const counterSlice = createSlice({
  name: "tourState",
  initialState,
  reducers: {
    setTourList: (state, action: PayloadAction<Tour[]>) => {
      state.tourList = action.payload;
    },
    updateTourList: (state, action: PayloadAction<Tour[]>) => {
      state.filteredTourList = action.payload;
    },
    setSelectedTour: (state, action: PayloadAction<Tour>) => {
      state.selectedTour = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTourList, updateTourList, setSelectedTour } =
  counterSlice.actions;

export default counterSlice.reducer;
