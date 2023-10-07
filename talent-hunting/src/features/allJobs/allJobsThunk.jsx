import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
// import { clearValue } from "./jobSlice";
// import { logoutUser } from "../user/userSlice";
// import authHeader from "../../utils/AuthHeader";

export const getAllJobsThunk = async (_, thunkAPI) => {
  // let url = `/jobs`
  const { search, searchStatus, searchType, sort, page } =
    thunkAPI.getState().allJobs;
  // console.log(thunkAPI.getState());
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    // thunkAPI.dispatch(clearValue());
    // console.log(resp.data);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/jobs/stats");
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
