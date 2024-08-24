import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, Menu, User2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/uitl/Contanst";
import { setUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      toast.error(err.data.message);
    }
  };

  return (
    <div className="bg-white shadow-md relative">
      <div className="flex justify-between items-center mx-auto max-w-5xl h-16 px-4 md:px-6 lg:px-8">
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          <h1 className="text-xl md:text-2xl font-bold cursor-pointer">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Links for larger screens */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="hidden md:flex items-center font-medium gap-3 md:gap-5">
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
                <Button className="hover:bg-gray-400 rounded text-sm md:text-base">
                  Login
                </Button>
              </Link>
              <Link to={"signup"}>
                <Button
                  variant="secondary"
                  className="bg-[#6A38C2] hover:bg-[#39009b] text-white rounded font-medium text-sm md:text-base"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="rounded-full cursor-pointer">
                  <AvatarImage
                    className="w-8 md:w-10 h-10 rounded-full"
                    src={user.profile.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 md:w-80 p-4 shadow-md outline-none bg-white rounded-lg">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Avatar className="rounded-full">
                    <AvatarImage
                      className="w-8 h-10 md:w-12 md:h-12 rounded-full"
                      src={user.profile.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h4 className="text-lg font-medium">{user.fullname}</h4>
                    <p className="text-sm text-gray-600">{user.profile.bio}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col space-y-2">
                  {user && user.role === "Student" ? (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 className="text-gray-600" />
                      <Button
                        variant="link"
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="text-gray-600" />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      LogOut
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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
                    <Button
                      className="hover:bg-gray-400 rounded text-sm"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to={"signup"}>
                    <Button
                      variant="secondary"
                      className="bg-[#6A38C2] hover:bg-[#39009b] text-white rounded font-medium text-sm"
                      onClick={() => setMenuOpen(false)}
                    >
                      Signup
                    </Button>
                  </Link>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="rounded-full cursor-pointer">
                      <AvatarImage
                        className="w-8 h-10 rounded-full"
                        src={user.profile.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                  </PopoverTrigger>
                </Popover>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
