import React, { useState } from "react";
import Navbar from "../User/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../uitl/Contanst";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";

function CreateCompany() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success("Company Registered Successfully");
        const companyId = res.data.company._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company</h1>
          <p className="text-gray-500">
            What would you like to name your company?
          </p>
          <label
            className="block mt-4 text-sm font-semibold"
            htmlFor="companyName"
          >
            Company Name
          </label>
        </div>
        <input
          type="text"
          id="companyName"
          className="my-2 w-full border border-gray-300 p-2 rounded-md"
          placeholder="JobHunt Company Name"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-4 my-10">
          <button
            className="px-4 py-2 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition duration-300 rounded-md text-sm md:text-base"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition duration-300 rounded-md text-sm md:text-base"
            onClick={registerNewCompany}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateCompany;
