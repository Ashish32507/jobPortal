import React from "react";
import JobCard from "../User/JobCard";
import { useSelector } from "react-redux";

function LatestJob() {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <>
      {console.log("All Jobs From Latest", allJobs)}
      <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {allJobs.length <= 0
            ? "No Job Found"
            : allJobs.map((job, index) => <JobCard key={index} job={job} />)}
        </div>
      </div>
    </>
  );
}

export default LatestJob;
