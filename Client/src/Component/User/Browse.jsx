import React from "react";
import Navbar from "../../Component/User/Navbar";
import Footer from "./Footer";
import Job from "../User/Job";

const randomJobs = [1, 2, 3, 4];

function Browse() {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Search Results ({randomJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {randomJobs.map((data, index) => (
            <Job key={index} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Browse;
