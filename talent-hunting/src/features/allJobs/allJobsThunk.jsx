import customFetch from "../../utils/axios";
// import { clearValue } from "./jobSlice";
import { logoutUser } from "../user/userSlice";
// import authHeader from "../../utils/AuthHeader";



export const getAllJobsThunk = async(url,thunkAPI)=>{
    try {
        const resp = await customFetch.get(url);
        // thunkAPI.dispatch(clearValue());
        console.log(resp.data);
        return resp.data;
      } catch (error) {
        if (error.response.status === 401) {
          thunkAPI.dispatch(logoutUser());
          return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
};