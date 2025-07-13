import React, { useEffect, useState } from "react";
import Navbar from "../User/Navbar";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../uitl/Contanst";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";

function CompanySetup() {
  const { id } = useParams();
  useGetCompanyById(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setFormData((prevData) => ({
      ...prevData,
      file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("website", formData.website);
      submitData.append("location", formData.location);
      submitData.append("file", formData.file);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Error occurred during company update");
      console.error("Error Occurred During Updating Company:", err);
    } finally {
      setLoading(false);
    }

    setFormData({
      name: "",
      description: "",
      website: "",
      location: "",
      file: null,
    });
  };

  useEffect(() => {
    setFormData({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 p-5 border rounded-md shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 mb-8">
            <button
              type="button"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
              <span>Back</span>
            </button>
            <h1 className="font-bold text-2xl">Company Setup</h1>
          </div>

          {/* Company Name */}
          <div className="mb-5">
            <label
              htmlFor="company-name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              id="company-name"
              name="name"
              type="text"
              placeholder="Enter company name"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              placeholder="Describe your company"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Website */}
          <div className="mb-5">
            <label
              htmlFor="website"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Website
            </label>
            <input
              id="website"
              name="website"
              type="text"
              placeholder="https://www.companywebsite.com"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          {/* Location */}
          <div className="mb-5">
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Enter location"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Logo File */}
          <div className="mb-5">
            <label
              htmlFor="logo-file"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Upload Company Logo
            </label>
            <input
              id="logo-file"
              name="file"
              type="file"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={changeFileHandler}
            />
          </div>

          {/* Submit Button */}
          <div className="mb-5">
            {loading ? (
              <button className="w-full flex items-center justify-center bg-black text-white rounded-md py-2">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Please Wait
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-xl font-bold text-white rounded-sm hover:bg-blue-700 py-2"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default CompanySetup;
