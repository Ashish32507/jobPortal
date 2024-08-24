import { useState } from "react";
import Navbar from "./components/shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/shared/Login.jsx";
import Signup from "./components/shared/Signup.jsx";
import Home from "./Home.jsx";
import Jobs from "./components/shared/Jobs.jsx";
import Browse from "./components/shared/Browse.jsx";
import Profile from "./components/shared/Profile.jsx";
import JobDetails from "./components/shared/JobDetails.jsx";
import Companies from "./components/admin/Companies.jsx";
import CreateCompany from "./components/admin/CreateCompany.jsx";
import CompanySetup from "./components/admin/CompanySetup.jsx";
import AdminJobs from "./components/admin/AdminJobs.jsx";
import CreateJobs from "./components/admin/CreateJobs.jsx";
// import JobApplicants from "./components/admin/JobApplicants";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/details/:id",
    element: <JobDetails />,
  },

  {
    path: "/admin/companies",
    element: <Companies />,
  },
  {
    path: "/admin/companies/create",
    element: <CreateCompany />,
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
  {
    path: "/admin/jobs/post",
    element: <CreateJobs />,
  },
  // {
  //   path: "/admin/jobs/:id/applicants",
  //   element: <JobApplicants />,
  // },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
