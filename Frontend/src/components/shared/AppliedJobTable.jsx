import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/uitl/Contanst";

function AppliedJobTable() {
  const { user } = useSelector((store) => store.auth);
  const [appliedJob, setAppliedJob] = useState([]);
  useEffect(() => {
    const fetchAppliedJob = async () => {
      const response = await axios.get(
        `${APPLICATION_API_END_POINT}/getallApplied/${user._id}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data.applications);
      setAppliedJob(response.data.applications);
    };
    fetchAppliedJob();
  }, []);
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white shadow-lg rounded-lg">
        <TableCaption className="text-lg font-semibold p-4 bg-gray-100">
          A List Of Your Applied Jobs
        </TableCaption>
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="px-4 py-2 text-left">Date</TableHead>
            <TableHead className="px-4 py-2 text-left">Job Role</TableHead>
            <TableHead className="px-4 py-2 text-left">Company</TableHead>
            <TableHead className="px-4 py-2 text-left">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJob.map((data, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition duration-300"
            >
              <TableCell className="px-4 py-2 font-medium text-gray-700">
                {data.createdAt.slice(0, 10)}
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-600">
                {data.job.title}
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-600">
                {data.job.company.name}
              </TableCell>
              <TableCell className="px-4 py-2 text-right text-gray-600 flex items-start">
                <Badge
                  className="bg-black text-right text-white px-2  py-1 rounded-full shadow-sm"
                  variant="outline"
                >
                  {data.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
