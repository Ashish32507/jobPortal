import { useState } from "react";
import Navbar from "./Component/User/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Component/User/Signup";
import Login from "../src/Component/User/Login";
import Home from "../src/Home";
import Jobs from "../src/Component/User/Jobs";
import Browse from "../src/Component/User/Browse";
import Profile from "../src/Component/User/Profile";
import JobDetails from "../src/Component/User/JobDetails";
import Companies from "../src/Component/Admin/Companies";
import CreateCompany from "../src/Component/Admin/CreateCompany";
import CompanySetup from "../src/Component/Admin/CompanySetup";
import AdminJobs from "../src/Component/Admin/AdminJob";
import CreateJobs from "../src/Component/Admin/CreateJobs";
import Applicant from "../src/Component/Admin/Applicant";
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
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicant />,
  },
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
