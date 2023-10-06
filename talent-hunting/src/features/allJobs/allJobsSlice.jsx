import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllJobsThunk } from "./allJobsThunk";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
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

export const getAlljobs = createAsyncThunk(
  "alljobs/getJobs",
  async (_, thunkAPI) => {
    // let url = `/jobs`
    return getAllJobsThunk("/jobs", thunkAPI);
  },
);

export const showStats = createAsyncThunk(
  'allJobs/showStats',
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get('/jobs/stats');
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

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
    handleFilter: (state)=>{
      return {...state, ...initialFilterState}
    },
    handleChange: (state,{payload:{name,value}})=>{
        state[name] = value;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAlljobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlljobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
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
        state.monthlyApplications = payload.monthlyApplications
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { showLoading, hideLoading,handleSearch,handleFilter } = allJobsSlice.actions;

export default allJobsSlice.reducer;
