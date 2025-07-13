import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../uitl/Contanst";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="bg-white shadow-md relative">
      <div className="flex justify-between items-center mx-auto max-w-5xl h-16 px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div onClick={() => navigate("/")}>
          <h1 className="text-xl md:text-2xl font-bold cursor-pointer">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path
                  d="M4 6h16M4 12h16m-7 6h7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Links for Larger Screens */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex items-center font-medium gap-3 md:gap-5">
            {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <Link to={"/login"}>
                <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-sm md:text-base">
                  Login
                </button>
              </Link>
              <Link to={"signup"}>
                <button className="bg-[#6A38C2] hover:bg-[#39009b] text-white px-4 py-2 rounded text-sm md:text-base">
                  Signup
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center cursor-pointer"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.profile.profilePhoto}
                  alt="User"
                />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg">
                  <div className="px-4 py-2">
                    <h4 className="text-lg font-medium">{user.fullname}</h4>
                    <p className="text-sm text-gray-600">{user.profile.bio}</p>
                  </div>
                  <div className="mt-2">
                    {user.role === "Student" && (
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        View Profile
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      LogOut
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
            <ul className="flex flex-col items-center space-y-4 p-4 font-medium">
              {user && user.role === "Recruiter" ? (
                <>
                  <li>
                    <Link
                      to={"/admin/companies"}
                      onClick={() => setMenuOpen(false)}
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link to={"/admin/jobs"} onClick={() => setMenuOpen(false)}>
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={"/"} onClick={() => setMenuOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={"/jobs"} onClick={() => setMenuOpen(false)}>
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to={"/browse"} onClick={() => setMenuOpen(false)}>
                      Browse
                    </Link>
                  </li>
                </>
              )}

              {!user ? (
                <div className="flex flex-col items-center space-y-2">
                  <Link to={"/login"}>
                    <button
                      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-sm"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </button>
                  </Link>
                  <Link to={"signup"}>
                    <button
                      className="bg-[#6A38C2] hover:bg-[#39009b] text-white px-4 py-2 rounded text-sm"
                      onClick={() => setMenuOpen(false)}
                    >
                      Signup
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="relative group">
                  <button className="flex items-center cursor-pointer">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.profile.profilePhoto}
                      alt="User"
                    />
                  </button>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
