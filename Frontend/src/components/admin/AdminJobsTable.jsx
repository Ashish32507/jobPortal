import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJob, setFilterJob] = useState(allAdminJobs);

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

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full table-auto">
        <TableCaption>A List Of Recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="p-4 text-left font-semibold text-sm md:text-base">
              Company Name
            </TableHead>
            <TableHead className="p-4 text-left font-semibold text-sm md:text-base">
              Role
            </TableHead>
            <TableHead className="p-4 text-left font-semibold text-sm md:text-base">
              Date
            </TableHead>
            <TableHead className="p-4 text-right font-semibold text-sm md:text-base">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJob?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center p-4">
                Job Not Found
              </TableCell>
            </TableRow>
          ) : (
            filterJob?.map((job) => (
              <TableRow
                key={job._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <TableCell className="p-4 text-sm md:text-base">
                  {job?.company?.name || "Unknown Company"}
                </TableCell>
                <TableCell className="p-4 text-sm md:text-base">
                  {job?.title}
                </TableCell>
                <TableCell className="p-4 text-sm md:text-base">
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="p-4 text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="w-5 h-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-16 bg-white shadow-md rounded-md">
                      <div
                        onClick={() => {
                          navigate(`/admin/companies/${job._id}`);
                        }}
                        className="flex items-center w-full gap-2 cursor-pointer p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Edit2 className="w-4" />
                        <span className="text-sm">Edit</span>
                      </div>
                      <div
                        onClick={() => {
                          navigate(`/admin/jobs/${job._id}/applicants`);
                        }}
                        className="flex items-center w-full gap-2 cursor-pointer mt-2 p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Eye />
                        <span className="text-sm">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
