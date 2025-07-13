import { setSingleCompany } from "../redux/companySlice";
import { setAllJobs } from "../redux/jobSlice";
import { COMPANY_API_END_POINT } from "../uitl/Contanst";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function useGetCompanyById() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/getcompanybyid/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.jobs);
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (err) {
        console.log("Error Occured", err);
        // console.log(err.res.data.message);
      }
    };
    fetchSingleCompany();
  }, [id, dispatch]);
}

export default useGetCompanyById;
