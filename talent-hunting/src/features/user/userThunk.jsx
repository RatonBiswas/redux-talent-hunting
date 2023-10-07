// import authHeader from "../../utils/AuthHeader";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValue } from "../job/jobSlice";
import {  logoutUser } from "./userSlice";
import { toast } from "react-toastify";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
    // console.log(resp);
    // console.log(resp.data);
  } catch (error) {
    return toast(thunkAPI.rejectWithValue(error.response.data.msg));
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user);
    return resp.data;
    // console.log(resp.data);
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    // logout User
    thunkAPI.dispatch(logoutUser(message));
    // Clear Job Value
    thunkAPI.dispatch(clearAllJobsState);
    // CLEAR JOB INPUT VALUE
    thunkAPI.dispatch(clearValue());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};
