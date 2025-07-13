import { setAllJobs } from "../redux/jobSlice";
import { JOB_API_END_POINT } from "../uitl/Contanst";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetSingleJob({ jobId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSinglejob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/getjobbyid/${jobId}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.jobs);
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (err) {
        console.log("Error Occured", err);
        // console.log(err.res.data.message);
      }
    };
    fetchSinglejob();
  }, []);
}

export default useGetSingleJob;
