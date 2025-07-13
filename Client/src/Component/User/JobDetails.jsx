import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Adjusted import
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  JOB_API_END_POINT,
  APPLICATION_API_END_POINT,
} from "../../uitl/Contanst";
import { setSingleJob } from "../../redux/jobSlice";
import { toast } from "react-toastify"; // Import Toastify

function JobDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);

  const calCulateDate = (created) => {
    const jobDate = new Date(created);
    const now = Date.now();
    const diffInMs = now - jobDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getjobbyid/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        } else {
          toast.error("Failed to fetch job details.");
        }
      } catch (err) {
        console.error("Error Occurred", err);
        toast.error("Error occurred while fetching job details.");
      }
    };

    fetchJob();
  }, [id, dispatch]);

  useEffect(() => {
    if (singleJob && user) {
      const applied = singleJob.application.includes(user._id);
      setIsApplied(applied);
    }
  }, [singleJob, user]);

  const handleApplyClick = async () => {
    if (!isApplied) {
      if (!user) {
        toast.warn("Please log in to apply for the job.");
        return;
      }
      try {
        const response = await axios.get(
          `${APPLICATION_API_END_POINT}/apply/${id}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          setIsApplied(true);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error while applying:", error);
        toast.error("Error occurred while applying for the job.");
      }
    }
  };

  if (!singleJob) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 p-4 sm:p-6 lg:p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="font-bold text-xl sm:text-2xl">{singleJob.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="bg-blue-100 text-blue-700 font-bold text-xs sm:text-sm md:text-base px-2 py-1 rounded">
                {singleJob.position} Position
              </span>
              <span className="bg-red-100 text-red-700 font-bold text-xs sm:text-sm md:text-base px-2 py-1 rounded">
                {singleJob.jobType}
              </span>
              <span className="bg-purple-100 text-purple-700 font-bold text-xs sm:text-sm md:text-base px-2 py-1 rounded">
                {singleJob.salary}
              </span>
            </div>
          </div>
          <button
            onClick={handleApplyClick}
            disabled={isApplied || !user} // Disable if already applied or user is not logged in
            className={`px-4 py-2 rounded-lg text-white ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : user
                ? "bg-purple-700 hover:bg-purple-600"
                : "bg-gray-400 cursor-not-allowed" // Background color when user is not logged in
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Job Description
        </h1>
        <div>
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob.experience}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob.salary}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Position:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob.position}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Requirements:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob.requirements.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-black font-bold text-xs sm:text-sm md:text-base px-2 mx-2 rounded"
                >
                  {skill}
                </span>
              ))}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applications:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob.application.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {calCulateDate(singleJob.createdAt)} Days Ago
            </span>
          </h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JobDetails;
