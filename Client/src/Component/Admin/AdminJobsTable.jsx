import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";

function AdminJobsTable() {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJob, setFilterJob] = useState(allAdminJobs);
  const [option, setOption] = useState(null);

  useEffect(() => {
    const filteredJob =
      allAdminJobs.length >= 0 &&
      allAdminJobs?.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase());
      });
    setFilterJob(filteredJob);
  }, [allAdminJobs, searchJobByText]);

  // Function to toggle the visibility of the options for a specific job
  const toggleOptions = (jobId) => {
    setOption((prevOption) => (prevOption === jobId ? null : jobId));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <caption className="text-lg font-bold">
          A List Of Recent Posted Jobs
        </caption>
        <thead>
          <tr>
            <th className="p-4 text-left font-semibold text-sm md:text-base">
              Company Name
            </th>
            <th className="p-4 text-left font-semibold text-sm md:text-base">
              Role
            </th>
            <th className="p-4 text-left font-semibold text-sm md:text-base">
              Date
            </th>
            <th className="p-4 text-right font-semibold text-sm md:text-base">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filterJob?.length <= 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                Job Not Found
              </td>
            </tr>
          ) : (
            filterJob?.map((job) => (
              <tr
                key={job._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-sm md:text-base">
                  {job?.company?.name || "Unknown Company"}
                </td>
                <td className="p-4 text-sm md:text-base">{job?.title}</td>
                <td className="p-4 text-sm md:text-base">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() => toggleOptions(job._id)}
                      className="flex items-center"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    {option === job._id && (
                      <div className=" absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-50">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${job._id}`)
                          }
                          className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <Edit2 className="w-4 mr-2" />
                          <span className="text-sm">Edit</span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <Eye className="w-4 mr-2" />
                          <span className="text-sm">Applicants</span>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminJobsTable;
