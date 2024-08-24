import React, { useState } from "react";
import Navbar from "./Navbar";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../uitl/Contanst";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

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
    file: null, // Ensure initial state is null
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    console.log(e.target.files); // Debugging
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

    console.log(input);
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
      console.error("Error occurred in API:", err);
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
      file: null, // Reset file state
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
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              value={input.fullname}
              name="fullname"
              onChange={changeHandler}
              id="fullname"
              type="text"
              placeholder="Enter Your Name"
              className="w-full border px-4 py-2"
            />
          </div>
          <div className="my-4">
            <Label htmlFor="email">Email</Label>
            <Input
              value={input.email}
              name="email"
              onChange={changeHandler}
              id="email"
              type="email"
              className="w-full border px-4 py-2"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="my-4">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeHandler}
              id="phoneNumber"
              type="number"
              className="w-full border px-4 py-2"
              placeholder="Enter Your Number"
            />
          </div>
          <div className="my-4">
            <Label htmlFor="password">Password</Label>
            <Input
              value={input.password}
              name="password"
              onChange={changeHandler}
              id="password"
              type="password"
              className="w-full border px-4 py-2"
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
                <Label htmlFor="student">Student</Label>
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
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <Label htmlFor="file">Profile</Label>
              <Input
                onChange={changeFileHandler}
                name="file"
                id="file"
                type="file"
                className="w-full sm:w-auto border px-4 py-2 cursor-pointer"
              />
            </div>
          </div>
          <div className="w-full my-4">
            {loading ? (
              <Button className="w-full flex items-center justify-center h-12 bg-black text-white rounded-md">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-black text-xl font-bold text-white rounded-sm hover:bg-blue-700 hover:cursor-pointer pb-2"
              >
                Signup
              </Button>
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
