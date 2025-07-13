import React, { useEffect } from "react";
import Navbar from "../src/Component/User/Navbar";
import HeroSection from "../src/Component/User/HeroSection";
import CategoryCarousel from "../src/Component/User/CategoryCarousel";
import LatestJob from "../src/Component/User/LatestJob";
import Footer from "../src/Component/User/Footer";
import useGetAllJobs from "../src/hooks/useGetAllJobs";
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
