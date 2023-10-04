import customFetch from "../../utils/axios";
// import { clearValue } from "./jobSlice";
import { logoutUser } from "../user/userSlice";


export const getAllJobsThunk = async(url,thunkAPI)=>{
    try {
        const resp = await customFetch.get(url, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
        // thunkAPI.dispatch(clearValue());
        return resp.data;
      } catch (error) {
        if (error.response.status === 401) {
          thunkAPI.dispatch(logoutUser());
          return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
};