import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";
import { Badge } from "../ui/badge";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import store from "@/redux/Store";

const skills = ["HTML", "CSS", "REACT JS", "Node JS"];

function Profile() {
  const isResume = true;
  const [open, setOpen] = useState(false); // Initial state for modal
  const { user } = useSelector((store) => store.auth);
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-6 lg:p-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
              <AvatarImage
                className="rounded-full w-28 h-28"
                src={user.profile.profilePhoto}
                alt="Profile Picture"
              />
            </Avatar>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                {user.fullname}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {user.profile.bio}
              </p>
            </div>
          </div>
          <Button
            className="border-none p-2"
            variant="outline"
            onClick={() => setOpen(true)} // Open the modal on click
          >
            <Pen />
          </Button>
        </div>

        {/* Contact Information */}
        <div className="my-4">
          <div className="flex items-center gap-3 my-2">
            <Mail className="text-gray-600" />
            <span className="text-sm sm:text-base">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact className="text-gray-600" />
            <span className="text-sm sm:text-base">{user.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-4">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Skills
          </h1>
          <div className="flex flex-wrap gap-2 my-5">
            {user?.profile?.skill.length ? (
              user.profile.skill.map((item, index) => (
                <Badge
                  key={index}
                  className="text-sm sm:text-base px-3 py-1 bg-black text-white rounded-full"
                >
                  {item.slice(0, 1).toUpperCase() + item.slice(1)}
                </Badge>
              ))
            ) : (
              <span className="text-sm sm:text-base text-gray-600">
                Skill Not Found
              </span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user.profile.resumeOrignalName}
            </a>
          ) : (
            <span className="text-sm sm:text-base text-gray-600">
              Not Applicable
            </span>
          )}
        </div>

        {/* Applied Jobs Section */}
        <div className="my-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Applied Jobs
          </h1>
          <AppliedJobTable />
        </div>
        {open ? <UpdateProfile setOpen={setOpen} /> : ""}
      </div>
      <Footer />
    </>
  );
}

export default Profile;
