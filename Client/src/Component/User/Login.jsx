import React, { useState } from "react";
import Navbar from "../User/Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "../../uitl/Contanst";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-5xl mx-auto my-4 px-4 md:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-6 my-10 shadow-md"
        >
          <h1 className="font-bold text-xl mb-5">Login Here</h1>
          <div className="my-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              onChange={changeHandler}
              name="email"
              value={input.email}
              id="email"
              type="email"
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="my-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              name="password"
              onChange={changeHandler}
              value={input.password}
              id="password"
              type="password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="my-4 flex flex-col sm:flex-row items-center gap-5">
            <div className="flex items-center gap-5">
              <div className="flex space-x-2 items-center">
                <input
                  checked={input.role === "Student"}
                  type="radio"
                  value="Student"
                  name="role"
                  id="student"
                  className="mr-2"
                  onChange={changeHandler}
                />
                <label htmlFor="student">Student</label>
              </div>
              <div className="flex space-x-2 items-center">
                <input
                  type="radio"
                  value="Recruiter"
                  name="role"
                  id="recruiter"
                  className="mr-2"
                  onChange={changeHandler}
                  checked={input.role === "Recruiter"}
                />
                <label htmlFor="recruiter">Recruiter</label>
              </div>
            </div>
          </div>
          <div className="w-full my-4">
            {loading ? (
              <button className="w-full flex items-center justify-center bg-black text-white rounded-md py-2">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Please Wait
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-xl font-bold text-white rounded-md hover:bg-blue-700 pb-2"
              >
                Login
              </button>
            )}
          </div>
          <div className="w-full my-4 text-center">
            <span>
              Don't Have an Account?{" "}
              <Link to="/signup" className="text-blue-600">
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
