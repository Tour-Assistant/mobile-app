import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Tour } from "../types/tourType";

export interface TourState {
  tourList: Tour[];
  filteredTourList: Tour[];
  selectedTour: Tour | undefined;
  status: string;
  error: string;
}

const initialState: TourState = {
  tourList: [],
  filteredTourList: [],
  selectedTour: undefined,
  status: "",
  error: "",
};

export const fetchTourList = createAsyncThunk(
  "tours/fetchTourList",
  async () => {
    const response = await axios.get(
      "https://tour-api.my-tour-assistant.com/v1/tours"
    );
    console.log(response.data);
    return response.data as Tour[];
  }
);

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
  extraReducers: {
    [fetchTourList.pending.type]: (state, action) => {
      state.status = "loading";
    },
    [fetchTourList.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.tourList.push(...action.payload);
    },
    [fetchTourList.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTourList, updateTourList, setSelectedTour } =
  counterSlice.actions;

export default counterSlice.reducer;
