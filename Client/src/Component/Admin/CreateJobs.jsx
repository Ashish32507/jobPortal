import React, { useState } from "react";
import Navbar from "../User/Navbar";
import Footer from "../../Component/User/Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../../uitl/Contanst";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function CreateJobs() {
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedFormData = {
      ...formData,
      position: Number(formData.position),
      salary: Number(formData.salary),
    };

    if (!parsedFormData.companyId) {
      alert("Please select a company");
      return;
    }

    try {
      const response = await axios.post(
        `${JOB_API_END_POINT}/postjob`,
        parsedFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/admin/jobs");
        toast.success(response.data.message);
        setFormData({
          title: "",
          description: "",
          requirements: "",
          salary: "",
          location: "",
          jobType: "",
          experience: "",
          position: "",
          companyId: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Internal Error Occurred");
    } finally {
      setFormData({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: "",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10 mb-10">
        <div className="bg-blue-600 p-4 rounded-md text-white mb-6">
          <h2 className="text-xl font-semibold text-center">Create Job</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title and Position */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <label className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="number"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Salary and Location */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Job Type and Experience */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <label className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Description and Requirements */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <label className="block text-sm font-medium text-gray-700">
                Requirements
              </label>
              <input
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Company Select */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <select
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a Company</option>
              {companies?.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Job
            </button>
          </div>
        </form>

        {companies.length <= 0 && (
          <p className="text-xs text-red-600 text-center my-3">
            Please register a company first, then add a job post.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CreateJobs;
