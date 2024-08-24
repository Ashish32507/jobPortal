// import React, { useEffect } from "react";
// import Navbar from "../shared/Navbar";
// import Footer from "../shared/Footer";
// import ApplicationTable from "./ApplicatioTable"; // Corrected file name and path
// import axios from "axios";
// import { APPLICATION_API_END_POINT } from "@/uitl/Contanst";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setAllApplicants } from "@/redux/applicationSlice";

// function JobApplicants() {
//   const dispatch = useDispatch();
//   const { allApplicants } = useSelector((store) => store.application);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchApplicants = async () => {
//       try {
//         const response = await axios.get(
//           `${APPLICATION_API_END_POINT}/getapplicant/${id}/applicant`
//         );
//         if (response.data.status) {
//           dispatch(setAllApplicants(response.data.job));
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchApplicants();
//   }, [id, dispatch]); // Added id and dispatch as dependencies

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-5xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
//         <h1 className="font-bold text-2xl mb-6">
//           Applicants ({allApplicants?.length || 0})
//         </h1>
//         <ApplicationTable applicants={allApplicants} />
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default JobApplicants;
