import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import jobReducer from "../redux/jobSlice";
import companyReducer from "../redux/companySlice"; // Renamed for consistency
// import applicantSlice from "./applicantSlice";
// Create the store using configureStore and directly pass individual reducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    company: companyReducer,
    // applicant: applicantSlice,
  },
});

export default store;
