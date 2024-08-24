import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
function Job({ job }) {
  const navigate = useNavigate();
  const jobId = job._id;
  const calCulateDate = (created) => {
    const jobDate = new Date(created);
    const now = Date.now();
    const diffInMs = now - jobDate.getTime();

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  return (
    <div className="p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-200">
      {console.log(jobId)}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm sm:text-base text-gray-500">
          {calCulateDate(job.createdAt) + " Days Ago"}
        </p>
        <Button
          variant="outline"
          className="rounded-full border-none p-1 sm:p-2"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-3 my-3">
        <Button className="p-2 sm:p-3 rounded-full">
          <Avatar className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border">
            <AvatarImage
              src={job?.company?.logo}
              className="w-full h-full object-cover "
            />
          </Avatar>
        </Button>
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
        <Badge
          className="text-blue-700 font-bold text-xs sm:text-sm md:text-base px-2"
          variant="ghost"
        >
          {job.position} Position
        </Badge>
        <Badge
          className="text-[#F83002] font-bold text-xs sm:text-sm md:text-base px-2"
          variant="ghost"
        >
          {job.jobType}
        </Badge>
        <Badge
          className="text-[#7209b7] font-bold text-xs sm:text-sm md:text-base px-2"
          variant="ghost"
        >
          {job.salary}
        </Badge>
        <Badge
          className="text-[#7209b7] font-bold text-xs sm:text-sm md:text-base px-2"
          variant="ghost"
        >
          {job.experience}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        {console.log(jobId)}
        <Button
          variant="outline"
          className="text-black border border-gray-300"
          onClick={() => {
            navigate(`/details/${jobId}`);
          }}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white">Apply</Button>
      </div>
    </div>
  );
}

export default Job;
