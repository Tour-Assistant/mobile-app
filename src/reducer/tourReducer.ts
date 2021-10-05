import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Tour } from "../types/tourType";

export interface TourState {
  tourList: Tour[];
  filteredTourList: Tour[];
  selectedTour: Tour | undefined;
  status: "SUCCED" | "LOADING" | "ERROR" | "FAILED" | "";
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
      state.status = "LOADING";
    },
    [fetchTourList.fulfilled.type]: (state, action) => {
      state.status = "SUCCED";
      state.tourList = action.payload;
    },
    [fetchTourList.rejected.type]: (state, action) => {
      state.status = "FAILED";
      state.error = action.error.message;
    },
  },
});

export const { setTourList, updateTourList, setSelectedTour } =
  counterSlice.actions;

export default counterSlice.reducer;
