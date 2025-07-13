import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FilterCard from "./FilterCard";
import Job from "../User/Job";
import { useSelector } from "react-redux";

function Jobs() {
  const { allJobs } = useSelector((store) => store.job); // Providing a default empty array

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/5 lg:w-1/6">
            <FilterCard />
          </div>
          <div className="flex-1 h-[70vh] md:h-[88vh] overflow-y-auto pb-5 px-2">
            {allJobs.length === 0 ? (
              <span className="text-center w-full">Job Not Found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allJobs.map((job, index) => (
                  <Job key={index} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Jobs;
