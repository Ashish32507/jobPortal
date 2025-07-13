import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import arrow icons

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "FullStack Developer",
  "Data Science",
  "Graphic Designer",
];

function CategoryCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative mx-auto w-[80%] my-4">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={prevSlide}
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {categories.map((category, index) => (
            <div key={index} className="flex-shrink-0 w-full px-2">
              <button className="w-full border border-gray-300 rounded-full px-4 py-2 text-center hover:bg-gray-200">
                {category}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryCarousel;
