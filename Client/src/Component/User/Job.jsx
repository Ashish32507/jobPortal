import React from "react";
import { useNavigate } from "react-router-dom";

function Job({ job }) {
  const navigate = useNavigate();
  const jobId = job._id;

  const calculateDate = (created) => {
    const jobDate = new Date(created);
    const now = Date.now();
    const diffInMs = now - jobDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  return (
    <div className="p-4 sm:p-5 rounded-md shadow-lg bg-white border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm sm:text-base text-gray-500">
          {calculateDate(job.createdAt) + " Days Ago"}
        </p>
        <button className="rounded-full border-none p-1 sm:p-2 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3h18v18H3V3z" />
            <path d="M3 3l18 18" />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-3 my-3">
        <div className="p-2 sm:p-3 rounded-full">
          <img
            src={job?.company?.logo}
            alt={job.company.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border"
          />
        </div>
        <div>
          <h1 className="text-sm sm:text-base font-medium">
            {job.company.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">{job.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-base sm:text-lg my-2">{job.title}</h1>
        <p className="text-xs sm:text-sm text-gray-600">{job.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-blue-700 font-bold text-xs sm:text-sm md:text-base px-2">
          {job.position} Position
        </span>
        <span className="text-[#F83002] font-bold text-xs sm:text-sm md:text-base px-2">
          {job.jobType}
        </span>
        <span className="text-[#7209b7] font-bold text-xs sm:text-sm md:text-base px-2">
          {job.salary}
        </span>
        <span className="text-[#7209b7] font-bold text-xs sm:text-sm md:text-base px-2">
          {job.experience}
        </span>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button
          className="text-black border border-gray-300 rounded-md p-2"
          onClick={() => navigate(`/details/${jobId}`)}
        >
          Details
        </button>
        <button className="bg-[#7209b7] text-white rounded-md p-2">
          Apply
        </button>
      </div>
    </div>
  );
}

export default Job;
