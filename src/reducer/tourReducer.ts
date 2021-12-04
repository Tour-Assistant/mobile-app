import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

import { HostedBy, Tour } from '../types/tourType';

export interface FilterData {
  groupId: string;
}

export interface TourState {
  tourList: Tour[];
  filteredTourList: Tour[];
  groupList: HostedBy[];
  selectedTour: Tour | undefined;
  selectedHostedBy: HostedBy | undefined;
  showContactModal: boolean;
  searchText: string;
  filterData: FilterData;
  showFilter: boolean;
  status: 'SUCCEED' | 'LOADING' | 'ERROR' | 'FAILED' | '';
  error: string;
}

const initialState: TourState = {
  tourList: [],
  filteredTourList: [],
  groupList: [],
  selectedTour: undefined,
  selectedHostedBy: undefined,
  showContactModal: false,
  searchText: '',
  showFilter: false,
  filterData: { groupId: 'all' },
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
    },
    setShowFilter: (state, action: PayloadAction<boolean>) => {
      state.showFilter = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload ?? '';
      if (!state.searchText) {
      } else {
      }
      state.filteredTourList = _.size(state.searchText)
        ? _.filter(state.tourList, tour => {
            const { title, description } = tour;
            if (
              title.toLowerCase().includes(action.payload.toLowerCase()) ||
              description.toLowerCase().includes(action.payload.toLowerCase())
            ) {
              return true;
            }
            return false;
          })
        : state.tourList;
    },
    setFilterGroupId: (state, action: PayloadAction<HostedBy['id']>) => {
      state.filterData = { groupId: action.payload };
      state.filteredTourList =
        _.isEmpty(action.payload) || action.payload === 'all'
          ? state.tourList
          : _.filter(
              state.tourList,
              tour => tour?.hostedBy?.id === action.payload
            );
    }
  },
  extraReducers: {
    [fetchTourList.pending.type]: state => {
      state.status = 'LOADING';
    },
    [fetchTourList.fulfilled.type]: (state, action) => {
      state.status = 'SUCCEED';
      state.tourList = action.payload;
      state.filteredTourList = action.payload;
      state.groupList = _(action.payload)
        .uniqBy('hostedBy.id')
        .map(tour => tour.hostedBy)
        .value();
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
  setShowContactModal,
  setShowFilter,
  setSearchText,
  setFilterGroupId
} = tourSlice.actions;

export default tourSlice.reducer;
