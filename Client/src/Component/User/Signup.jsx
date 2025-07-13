import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "../../uitl/Contanst";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
    setInput({
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
      file: null,
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-5xl mx-auto my-4 px-4 md:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-6 my-10 shadow-md"
        >
          <h1 className="font-bold text-xl mb-5">Signup Here</h1>
          <div className="my-4">
            <label htmlFor="fullname" className="block mb-2">
              Full Name
            </label>
            <input
              value={input.fullname}
              name="fullname"
              onChange={changeHandler}
              id="fullname"
              type="text"
              placeholder="Enter Your Name"
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>
          <div className="my-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              value={input.email}
              name="email"
              onChange={changeHandler}
              id="email"
              type="email"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="my-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <input
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeHandler}
              id="phoneNumber"
              type="number"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Enter Your Number"
            />
          </div>
          <div className="my-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              value={input.password}
              name="password"
              onChange={changeHandler}
              id="password"
              type="password"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="my-4 flex flex-col sm:flex-row items-center gap-5">
            <div className="flex items-center gap-5">
              <div className="flex items-center">
                <input
                  type="radio"
                  onChange={changeHandler}
                  value="Student"
                  name="role"
                  id="student"
                  checked={input.role === "Student"}
                  className="mr-2"
                />
                <label htmlFor="student">Student</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  onChange={changeHandler}
                  value="Recruiter"
                  name="role"
                  id="recruiter"
                  checked={input.role === "Recruiter"}
                  className="mr-2"
                />
                <label htmlFor="recruiter">Recruiter</label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <label htmlFor="file" className="block">
                Profile
              </label>
              <input
                onChange={changeFileHandler}
                name="file"
                id="file"
                type="file"
                className="w-full sm:w-auto border px-4 py-2 cursor-pointer rounded-md"
              />
            </div>
          </div>
          <div className="w-full my-4">
            {loading ? (
              <button className="w-full flex items-center justify-center h-12 bg-black text-white rounded-md">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Please Wait
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-xl font-bold text-white rounded-sm hover:bg-blue-700 hover:cursor-pointer pb-2"
              >
                Signup
              </button>
            )}
          </div>
          <div className="w-full my-4 text-center">
            <span>
              Already Have An Account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
