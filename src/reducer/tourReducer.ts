import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { HostAuthority, HostedBy, Tour } from '../types/tourType';

export interface TourState {
  tourList: Tour[];
  filteredTourList: Tour[];
  selectedTour: Tour | undefined;
  selectedHostedBy: HostedBy | undefined;
  showContactModal: boolean;
  status: 'SUCCEED' | 'LOADING' | 'ERROR' | 'FAILED' | '';
  error: string;
}

const initialState: TourState = {
  tourList: [],
  filteredTourList: [],
  selectedTour: undefined,
  selectedHostedBy: undefined,
  showContactModal: false,
  status: '',
  error: ''
};

export const fetchTourList = createAsyncThunk(
  'tours/fetchTourList',
  async () => {
    const response = await axios.get(
      'https://tour-api.my-tour-assistant.com/v1/tours'
    );
    return response.data as Tour[];
  }
);

export const tourSlice = createSlice({
  name: 'tourState',
  initialState,
  reducers: {
    setTourList: (state, action: PayloadAction<Tour[]>) => {
      state.tourList = action.payload;
    },
    updateTourList: (state, action: PayloadAction<Tour[]>) => {
      state.filteredTourList = action.payload;
    },
    setSelectedTour: (state, action: PayloadAction<Tour['id']>) => {
      state.selectedTour = state.tourList.find(
        ({ id }) => id === action.payload
      );
    },
    setSelectedHostedBy: (
      state,
      action: PayloadAction<HostedBy | undefined>
    ) => {
      state.selectedHostedBy = action.payload;
    },
    setShowContactModal: (state, action: PayloadAction<boolean>) => {
      state.showContactModal = action.payload;
    }
  },
  extraReducers: {
    [fetchTourList.pending.type]: (state, action) => {
      state.status = 'LOADING';
    },
    [fetchTourList.fulfilled.type]: (state, action) => {
      state.status = 'SUCCEED';
      state.tourList = action.payload;
    },
    [fetchTourList.rejected.type]: (state, action) => {
      state.status = 'FAILED';
      state.error = action.error.message;
    }
  }
});

export const {
  setTourList,
  updateTourList,
  setSelectedTour,
  setSelectedHostedBy,
  setShowContactModal
} = tourSlice.actions;

export default tourSlice.reducer;
