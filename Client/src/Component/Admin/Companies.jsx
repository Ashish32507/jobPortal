import React, { useEffect, useState } from "react";
import Navbar from "../User/Navbar";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "../../hooks/useGetAllCompany";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";
import CompaniesTable from "./CompaniesTable";
function Companies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompany(); // Fetch all companies when the component mounts
  const [keyword, setKeyword] = useState("");

  // Effect to dispatch the search filter action whenever the keyword changes
  useEffect(() => {
    dispatch(setSearchCompanyByText(keyword)); // Pass the keyword as an argument
  }, [keyword, dispatch]);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between my-5 gap-4">
          <input
            type="text"
            placeholder="Filter by Name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // Update keyword state on input change
            className="w-full sm:w-2/3 lg:w-3/4 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="w-full sm:w-auto px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition duration-300"
            onClick={() => navigate("/admin/companies/create")} // Navigate to create company page
          >
            New Company
          </button>
        </div>
        <CompaniesTable />
      </div>
    </>
  );
}

export default Companies;
