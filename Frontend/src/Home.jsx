import React, { useEffect } from "react";
import Navbar from "./components/shared/Navbar";
import HeroSection from "./components/shared/HeroSection";
import CategoryCarousel from "./components/shared/CategoryCarousel";
import LatestJob from "./components/shared/LatestJob";
import Footer from "./components/shared/Footer";
import useGetAllJobs from "./hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const nevigate = useNavigate();
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    if (user?.role === "Recruiter") {
      nevigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJob />
      <Footer />
    </div>
  );
}

export default Home;
