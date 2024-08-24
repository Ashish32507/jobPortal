import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import arrow icons
import "../../../src/index.css";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "FullStack Developer",
  "Data Science",
  "Graphic Designer",
  "Backend Developer",
  "FullStack Developer",
  "Data Science",
  "Graphic Designer",
];

function CategoryCarousel() {
  return (
    <div className="relative mx-auto w-[50%] my-4 px-8 md:px-8 lg:px-8">
      <Carousel className="overflow-x-auto scrollbar-hide">
        <CarouselContent className="flex justify-center space-x-4">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="flex-shrink-0 sm:w-auto">
              <Button
                variant="outline"
                className="w-full rounded-full px-4 py-2"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
