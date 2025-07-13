import React from "react";

function HeroSection() {
  return (
    <div className="text-center pt-8">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-6 py-2 rounded-full font-semibold bg-gray-100 text-[#F83002]">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold mt-4">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Job</span>
        </h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id libero
          quam rerum, repellendus optio commodi.
        </p>
        <div className="flex w-[80%] sm:w-[60%] lg:w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            className="outline-none border-none w-full px-4 py-2 text-gray-600"
            type="text"
            placeholder="Find Your Dream Job"
          />
          <button className="rounded-r-full bg-[#6A38C2] text-white px-4 py-2">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.4-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
