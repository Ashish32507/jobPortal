import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

function HeroSection() {
  return (
    <>
      <div className="text-center pt-8">
        <div className="flex flex-col gap-5 my-10">
          <span className="mx-auto px-6 py-2 rounded-full font-semibold bg-gray-100 text-[#F83002]">
            No. 1 Job Hunt Website
          </span>
          <h1 className="text-5xl font-bold mt-4">
            Search, Apply & <br /> Get Your{" "}
            <span className="text-[#6A38C2]">Dream Job</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id libero
            quam rerum, repellendus optio commodi.
          </p>
          <div className="flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              className="outline-none border-none w-full"
              type="text"
              placeholder="Find Your Dream Job"
            />
            <Button className="rounded-r-full bg-[#6A38C2] text-white">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
