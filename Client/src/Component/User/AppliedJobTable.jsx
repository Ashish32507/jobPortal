import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../uitl/Contanst";
import { toast } from "react-toastify"; // Import Toastify

function AppliedJobTable() {
  const { user } = useSelector((store) => store.auth);
  const [appliedJob, setAppliedJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(user);
  useEffect(() => {
    const fetchAppliedJob = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_API_END_POINT}/getallApplied/${user._id}`,
          {
            withCredentials: true,
          }
        );
        setAppliedJob(response.data.applications);
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
        setError("Failed to fetch applied jobs.");
        toast.error("Failed to fetch applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAppliedJob();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full bg-white shadow-lg rounded-lg">
        <div className="text-lg font-semibold p-4 bg-gray-100">
          A List Of Your Applied Jobs
        </div>
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Job Role</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedJob.length > 0 ? (
              appliedJob.map((data, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {data.createdAt.slice(0, 10)}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{data.job.title}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {data.job.company.name}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    <span className="bg-black text-white px-2 py-1 rounded-full shadow-sm">
                      {data.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-600">
                  No applied jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppliedJobTable;
