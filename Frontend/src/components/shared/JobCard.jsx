import React from "react";
import { Badge } from "@/components/ui/badge";

function JobCard(props) {
  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div className="mb-4">
        {console.log(props)}
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          {props.job.company.name}
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
          {props.job.location}
        </p>
      </div>
      <div className="mb-4">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          {props.job.title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
          {props.job.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className="text-blue-700 font-bold text-sm sm:text-base md:text-lg px-2"
          variant="ghost"
        >
          {props.job.position + " Position"}
        </Badge>
        <Badge
          className="text-[#F83002] font-bold text-sm sm:text-base md:text-lg px-2"
          variant="ghost"
        >
          {props.job.jobType}
        </Badge>
        <Badge
          className="text-[#7209b7] font-bold text-sm sm:text-base md:text-lg px-2"
          variant="ghost"
        >
          {props.job.salary}
        </Badge>
        <Badge
          className="text-[#7209b7] font-bold text-sm sm:text-base md:text-lg px-2"
          variant="ghost"
        >
          {props.job.experiance}
        </Badge>
      </div>
    </div>
  );
}

export default JobCard;
