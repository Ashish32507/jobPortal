import React from "react";

function FilterCard() {
  return (
    <div className="p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-200">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Filter Jobs</h2>

      <div className="mb-4">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Job Type
        </label>
        <select className="w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base">
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Job Category
        </label>
        <select className="w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base">
          <option>All</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Full Stack</option>
          <option>DevOps</option>
          <option>Data Science</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base"
          placeholder="Enter location"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Salary Range (in INR)
        </label>
        <div className="flex flex-col space-y-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="salary"
              value="0-20000"
              className="form-radio text-[#7209b7] h-4 w-4"
            />
            <span className="ml-2 text-sm sm:text-base">0 - 20,000</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="salary"
              value="20001-50000"
              className="form-radio text-[#7209b7] h-4 w-4"
            />
            <span className="ml-2 text-sm sm:text-base">20,001 - 50,000</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="salary"
              value="50001-75000"
              className="form-radio text-[#7209b7] h-4 w-4"
            />
            <span className="ml-2 text-sm sm:text-base">50,001 - 75,000</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="salary"
              value="75001-100000"
              className="form-radio text-[#7209b7] h-4 w-4"
            />
            <span className="ml-2 text-sm sm:text-base">75,001 - 1,00,000</span>
          </label>
        </div>
      </div>

      <div className="mt-6">
        <button className="w-full bg-[#7209b7] text-white py-2 rounded-md text-sm sm:text-base">
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default FilterCard;
