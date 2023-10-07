// import authHeader from "../../utils/AuthHeader";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { showLoading, hideLoading, getAlljobs } from "../allJobs/allJobsSlice";
import { clearValue } from "./jobSlice";

export const createJobThunk = async (job, thunkAPI) => {
  try {
    // const resp = await customFetch.post("/jobs", job, authHeader(thunkAPI));
    const resp = await customFetch.post("/jobs", job);
    thunkAPI.dispatch(clearValue());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAlljobs());
    return resp.data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValue());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
