import store from "@/redux/Store";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../uitl/Contanst";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
function UpdateProfile({ open, setOpen }) {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skill: user?.profile?.skill?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("skill", input.skill);
    formData.append("bio", input.bio);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/updateprofile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.data));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Error occurred in API:", err); // Improved error logging
      toast.error(err.response.data.message); // User-friendly error message
    }
    setOpen(false);
    console.log(input);
    setInput({
      fullname: "",
      email: "",
      phoneNumber: "",
      skill: "",
      bio: "",
    });
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-auto max-h-screen overflow-y-auto relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
        >
          &times;
        </button>
        <h2 className="text-lg sm:text-xl font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              value={input.fullname}
              onChange={changeHandler}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={changeHandler}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your contact number"
              value={input.phoneNumber}
              onChange={changeHandler}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Bio</label>
            <textarea
              name="bio"
              placeholder="Enter your bio"
              value={input.bio}
              onChange={changeHandler}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">
              Skills
            </label>
            <input
              type="text"
              name="skill"
              placeholder="Enter your skills, separated by commas"
              value={input.skill}
              onChange={changeHandler}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">
              Upload Resume
            </label>
            <input
              type="file"
              name="file"
              onChange={changeFileHandler}
              className="mt-1 w-full"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
