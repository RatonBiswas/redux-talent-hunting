import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createJobThunk } from "./jobThunk";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { showLoading, hideLoading, getAlljobs } from "../allJobs/allJobsSlice";
import customFetch from "../../utils/axios";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
  createdJobNav: false,
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => {
    return createJobThunk("/jobs", job, thunkAPI);
  },
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const resp = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(getAlljobs());
      return resp.data.msg;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

export const editJob = createAsyncThunk(
  "job/editJon",
  async ({ jobId, job }, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValue());
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValue: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return {
        ...state,
        isEditing: true,
        ...payload,
      };
      // console.log(state);
      // console.log(state.isEditing);
      // console.log(isEditing);
      // console.log(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        state.createdJobNav = true;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.fulfilled, () => {
        toast.success("Job deleted successfully");
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        state.createdJobNav = true;
        toast.success("Job Modified");
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValue, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
