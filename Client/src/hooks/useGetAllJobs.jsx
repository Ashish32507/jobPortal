import { setAllJobs, setSingleJob } from "../redux/jobSlice";
import { JOB_API_END_POINT } from "../uitl/Contanst";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetAllJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAlljob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getalljob`, {
          withCredentials: true,
        });
        // console.log("job From Get All Job")

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
          // console.log("job From Get All Job", res.data.jobs);
        }
      } catch (err) {
        console.log("Error Occured", err);
        // console.log(err.res.data.message);
      }
    };
    fetchAlljob();
  }, []);
}

export default useGetAllJobs;
