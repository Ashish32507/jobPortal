import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    allAdminJobs: [],
    searchJobByText: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      // Renamed for consistency
      state.searchJobByText = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText } =
  jobSlice.actions;

// Export the reducer to be added to the store
export default jobSlice.reducer;
