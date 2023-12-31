import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllJobsThunk, showStatsThunk } from "./allJobsThunk";
import { toast } from "react-toastify";
// import { getUserFromLocalStorage } from "../../utils/localStorage";

const initialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  ...initialFilterState,
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
};

export const getAlljobs = createAsyncThunk("alljobs/getJobs", getAllJobsThunk);

export const showStats = createAsyncThunk("allJobs/showStats", showStatsThunk);

const allJobsSlice = createSlice({
  name: "allJObs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFilterState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobsState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAlljobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlljobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.totalJobs = payload.totalJobs;
        state.numOfPages = payload.numOfPages;
      })
      .addCase(getAlljobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
