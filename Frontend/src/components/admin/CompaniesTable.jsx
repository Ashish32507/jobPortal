import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable({ keyword }) {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filter, setFilter] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies?.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilter(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="p-4 text-left font-semibold text-sm md:text-base">
              Logo
            </TableHead>
            <TableHead className="p-4 text-left font-semibold text-sm md:text-base">
              Name
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
          {filter?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center p-4">
                Company Not Found
              </TableCell>
            </TableRow>
          ) : (
            filter?.map((company) => (
              <TableRow
                key={company._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <TableCell className="p-4">
                  <Avatar>
                    <AvatarImage
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                      src={
                        company.logo ||
                        "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                      }
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="p-4 text-sm md:text-base">
                  {company.name}
                </TableCell>
                <TableCell className="p-4 text-sm md:text-base">
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="p-4 text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="w-5 h-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-16 bg-white shadow-md rounded-md">
                      <div
                        onClick={() => {
                          navigate(`/admin/companies/${company._id}`);
                        }}
                        className="flex items-center w-full gap-2 cursor-pointer p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Edit2 className="w-4" />
                        <span className="text-sm">Edit</span>
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

export default CompaniesTable;
