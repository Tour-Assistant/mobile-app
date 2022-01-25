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
  editorsChoiceGroupList: HostedBy[];
  filteredGroupList: HostedBy[];
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
  editorsChoiceGroupList: [],
  filteredGroupList: [],
  selectedTour: undefined,
  selectedHostedBy: undefined,
  showContactModal: false,
  searchText: '',
  showFilter: false,
  filterData: { groupId: 'all' },
  status: '',
  error: '',
};
// { searchText: string; filterData: FilterData }
const searchAndFilter = ({
  searchText = '',
  filterData = { groupId: 'all' },
  tourList = [],
}: {
  searchText: string;
  filterData: FilterData;
  tourList: Tour[];
}): Tour[] => {
  let filteredAndSearchedTourList = _.size(searchText)
    ? _.filter(tourList, (tour) => {
        const {
          title,
          description,
          places,
          hostedBy,
          curatedTitle = '',
        } = tour;
        searchText = searchText.toLowerCase().trim();
        if (
          title.toLowerCase().includes(searchText) ||
          (_.size(curatedTitle) &&
            curatedTitle.toLowerCase().includes(searchText)) ||
          description.toLowerCase().includes(searchText) ||
          places.some((place) => place.toLowerCase().includes(searchText)) ||
          hostedBy.name.toLowerCase().includes(searchText) ||
          (_.size(hostedBy.curatedName) &&
            hostedBy.curatedName.toLowerCase().includes(searchText))
        ) {
          return true;
        }
        return false;
      })
    : tourList;

  filteredAndSearchedTourList =
    _.isEmpty(filterData.groupId) || filterData.groupId === 'all'
      ? filteredAndSearchedTourList
      : _.filter(
          filteredAndSearchedTourList,
          (tour) => tour?.hostedBy?.id === filterData.groupId
        );
  return filteredAndSearchedTourList;
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

export const fetchGroupList = createAsyncThunk(
  'tours/fetchGroupList',
  async () => {
    const response = await axios.get(
      'https://host-api.my-tour-assistant.com/v1/hosts'
    );
    return response.data as HostedBy[];
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
      const { searchText, tourList, filterData } = state;
      state.filteredTourList = searchAndFilter({
        searchText: searchText,
        tourList: tourList,
        filterData: filterData,
      });
    },
    setFilterGroupId: (state, action: PayloadAction<HostedBy['id']>) => {
      state.filterData = { groupId: action.payload };
      const { searchText, tourList, filterData } = state;
      state.filteredTourList = searchAndFilter({
        searchText: searchText,
        tourList: tourList,
        filterData: filterData,
      });
    },
  },
  extraReducers: {
    [fetchTourList.pending.type]: (state) => {
      state.status = 'LOADING';
    },
    [fetchTourList.fulfilled.type]: (state, action) => {
      state.status = 'SUCCEED';
      state.tourList = action.payload;
      state.filteredTourList = action.payload;
    },
    [fetchTourList.rejected.type]: (state, action) => {
      state.status = 'FAILED';
      state.error = action.error.message;
    },

    [fetchGroupList.pending.type]: (state) => {
      state.status = 'LOADING';
    },
    [fetchGroupList.fulfilled.type]: (state, action) => {
      state.status = 'SUCCEED';
      state.groupList = action.payload;
      state.filteredGroupList = action.payload;
      state.editorsChoiceGroupList = action.payload.filter(
        (group: HostedBy) => group.isFavorite
      );
    },
    [fetchGroupList.rejected.type]: (state, action) => {
      state.status = 'FAILED';
      state.error = action.error.message;
    },
  },
});

export const {
  setTourList,
  updateTourList,
  setSelectedTour,
  setSelectedHostedBy,
  setShowContactModal,
  setShowFilter,
  setSearchText,
  setFilterGroupId,
} = tourSlice.actions;

export default tourSlice.reducer;
