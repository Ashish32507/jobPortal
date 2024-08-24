import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/uitl/Contanst";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetAllCompany() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/getcompany`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (err) {
        console.log("Error Occurred:", err);
      }
    };
    fetchAllCompany();
  }, [dispatch]); // Added dispatch as a dependency
}

export default useGetAllCompany; // Corrected the export name
