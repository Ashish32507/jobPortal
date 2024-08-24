import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  JOB_API_END_POINT,
  APPLICATION_API_END_POINT,
} from "../../uitl/Contanst";
import { setSingleJob } from "../../redux/jobSlice"; // Import the setSingleJob action
import { toast } from "sonner";

function JobDetails() {
  const dispatch = useDispatch();
  const { id } = useParams(); // Extract jobId from params
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
    // Check if the user has already applied for this job
    if (singleJob && user) {
      const applied = singleJob.application.includes(user._id);
      setIsApplied(applied);
    }
  }, [singleJob, user]);

  const handleApplyClick = async () => {
    if (!isApplied) {
      try {
        const jobId = id;
        const response = await axios.get(
          `${APPLICATION_API_END_POINT}/apply/${jobId}`,
          {
            withCredentials: true,
          }
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

  // Loading state
  if (!singleJob || !user) {
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
              <Badge
                className="text-blue-700 font-bold text-xs sm:text-sm md:text-base px-2"
                variant="ghost"
              >
                {singleJob.position} Position
              </Badge>
              <Badge
                className="text-[#F83002] font-bold text-xs sm:text-sm md:text-base px-2"
                variant="ghost"
              >
                {singleJob.jobType}
              </Badge>
              <Badge
                className="text-[#7209b7] font-bold text-xs sm:text-sm md:text-base px-2"
                variant="ghost"
              >
                {singleJob.salary}
              </Badge>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleApplyClick}
            disabled={isApplied}
            className={`${
              isApplied
                ? "bg-gray-600 rounded-lg text-white cursor-not-allowed"
                : "text-white rounded-lg bg-[#7209b7] hover:bg-[#2d024a]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
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
                <Badge
                  key={index} // Add key to avoid React warnings
                  className="text-black font-bold text-xs sm:text-sm md:text-base px-2 mx-2"
                  variant="ghost"
                >
                  {skill}
                </Badge>
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
