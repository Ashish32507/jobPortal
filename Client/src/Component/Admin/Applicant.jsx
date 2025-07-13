import React, { useEffect, useState } from "react";
import Navbar from "../User/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../uitl/Contanst";
import { useDispatch } from "react-redux";

function Applicant() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_API_END_POINT}/getapplicant/${id}/applicant`,
          { withCredentials: true }
        );
        console.log(response.data.job.application);
        if (response.data.success) {
          setApplicants(response.data.job);
        }
        console.log(response);
      } catch (err) {
        console.log("Internal Error", err);
      }
    };
    fetchApplicants();
  }, [id]); // Add id as a dependency

  // Define the accept and reject handlers
  const onAccept = (applicantId) => {
    console.log(`Accepted applicant with ID: ${applicantId}`);
    // Add your logic for handling accept action
  };

  const onReject = (applicantId) => {
    console.log(`Rejected applicant with ID: ${applicantId}`);
    // Add your logic for handling reject action
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-8 px-4">
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <caption className="text-lg font-bold mb-4 text-center">
              Applicant Details
            </caption>
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left font-semibold text-sm md:text-base">
                  Full Name
                </th>
                <th className="p-4 text-left font-semibold text-sm md:text-base">
                  Email
                </th>
                <th className="p-4 text-left font-semibold text-sm md:text-base">
                  Phone
                </th>
                <th className="p-4 text-left font-semibold text-sm md:text-base">
                  Resume
                </th>
                <th className="p-4 text-left font-semibold text-sm md:text-base">
                  Date Applied
                </th>
                <th className="p-4 text-right font-semibold text-sm md:text-base">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {applicants && applicants.length > 0 ? (
                applicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-sm md:text-base">
                      {applicant.fullName}
                    </td>
                    <td className="p-4 text-sm md:text-base">
                      {applicant.email}
                    </td>
                    <td className="p-4 text-sm md:text-base">
                      {applicant.phone}
                    </td>
                    <td className="p-4 text-sm md:text-base">
                      <a
                        href={applicant.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Resume
                      </a>
                    </td>
                    <td className="p-4 text-sm md:text-base">
                      {new Date(applicant.dateApplied).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right flex space-x-2">
                      <button
                        onClick={() => onAccept(applicant.id)}
                        className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onReject(applicant.id)}
                        className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-center text-sm md:text-base"
                  >
                    No applicants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Applicant;
