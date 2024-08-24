import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

function AdminJob() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  useGetAllAdminJobs();
  // Effect to dispatch the search filter action whenever the keyword changes
  useEffect(() => {
    dispatch(setSearchJobByText(keyword)); // Pass the keyword as an argument
  }, [keyword, dispatch]);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between my-5 gap-4">
          <Input
            className="w-full sm:w-2/3 lg:w-3/4"
            placeholder="Filter by Name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // Update keyword state on input change
          />
          <Button
            className="w-full sm:w-auto px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition duration-300"
            onClick={() => navigate("/admin/jobs/post")} // Navigate to create company page
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </>
  );
}

export default AdminJob;
