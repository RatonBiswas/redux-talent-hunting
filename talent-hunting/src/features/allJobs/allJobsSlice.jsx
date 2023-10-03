import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import customFetch from "../../utils/axios";
// import { logoutUser } from "../user/userSlice";
// import { createJobThunk } from "./allJobsThunk";
// import { getUserFromLocalStorage } from "../../utils/localStorage";

const initialFilterState = {
    search : '',
    searchStatus : 'all',
    searchType : 'all',
    sort: 'latest',
    sortOptions:['latest','oldest','a-z','z-a']
}

const initialState = {
    ...initialFilterState,
    isLoading: false,
    jobs:[1],
    totalJobs: 0 ,
    numOfPages : 1,
    page: 1,
    stats : {},
    monthlyApplications:[]
}

const allJobsSlice = createSlice({
    name: 'allJObs',
    initialState
})

export default allJobsSlice.reducer
