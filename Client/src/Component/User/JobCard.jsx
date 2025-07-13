import React from "react";

function JobCard(props) {
  return (
    <div className="p-4 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">{props.job.company.name}</h1>
        <p className="text-base text-gray-500">{props.job.location}</p>
      </div>
      <div className="mb-4">
        <h1 className="text-xl font-semibold">{props.job.title}</h1>
        <p className="text-base text-gray-500">{props.job.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="bg-blue-100 text-blue-700 font-bold text-sm px-2 py-1 rounded-full">
          {props.job.position} Position
        </span>
        <span className="bg-orange-100 text-[#F83002] font-bold text-sm px-2 py-1 rounded-full">
          {props.job.jobType}
        </span>
        <span className="bg-purple-100 text-[#7209b7] font-bold text-sm px-2 py-1 rounded-full">
          {props.job.salary}
        </span>
        <span className="bg-purple-100 text-[#7209b7] font-bold text-sm px-2 py-1 rounded-full">
          {props.job.experiance}
        </span>
      </div>
    </div>
  );
}

export default JobCard;
