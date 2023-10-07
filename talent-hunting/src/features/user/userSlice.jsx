import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import customFetch from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { loginUserThunk, registerUserThunk, updateUserThunk,clearStoreThunk } from "./userThunk";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

// register action creators
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk( "/auth/register",user, thunkAPI)
  },
);

//login User action creators
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login",user,thunkAPI)
  },
);

// update user action creators
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser",user,thunkAPI)
    
  },
);

export const clearStore = createAsyncThunk('user/clearStore',clearStoreThunk)

const userSlice = createSlice({
  name: "user",
  initialState,
  // extraReducers: {
  //   [registerUser.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [registerUser.fulfilled]: (state, { payload }) => {
  //     const { user } = payload;
  //     console.log(payload);
  //     state.isLoading = true;
  //     state.user = user;
  //     toast.success(`Hello there ${user.name}`);
  //   },
  //   [registerUser.rejected]: (state, { payload }) => {
  //     state.isLoading = false;
  //     toast.error(payload);
  //   },
  //   [loginUser.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [loginUser.fulfilled]: (state, { payload }) => {
  //     const { user } = payload;
  //     state.isLoading = true;
  //     state.user = user;
  //     toast.success(`Welcome Back ${user.name}`);
  //   },
  //   [loginUser.rejected]: (state, { payload }) => {
  //     state.isLoading = false;
  //     toast.error(payload);
  //   },
  // },
  reducers: {
    logoutUser: (state) => {
      state.user = null, 
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      toast.success("logout");
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Updated Profile Successfully`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        // state.isLoading = false;
        toast.error('There was an error....');
      })
  },
});
export const { logoutUser, toggleSidebar } = userSlice.actions;
export default userSlice.reducer;
