import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, MoreHorizontal, Eye } from "lucide-react";

function CompaniesTable({ keyword }) {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filter, setFilter] = useState(companies);
  const [option, setOption] = useState(null);

  // Toggle dropdown for company actions
  const toggleOptions = (companyId) => {
    if (option === companyId) {
      setOption(null);
    } else {
      setOption(companyId);
    }
  };

  useEffect(() => {
    const filteredCompanies = companies?.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });
    setFilter(filteredCompanies);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left font-semibold text-sm md:text-base">
              Logo
            </th>
            <th className="p-4 text-left font-semibold text-sm md:text-base">
              Name
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
          {filter?.length <= 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                Company Not Found
              </td>
            </tr>
          ) : (
            filter?.map((company) => (
              <tr
                key={company._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={
                        company.logo ||
                        "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                      }
                      alt={company.name}
                    />
                  </div>
                </td>
                <td className="p-4 text-sm md:text-base">{company.name}</td>
                <td className="p-4 text-sm md:text-base">
                  {new Date(company.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() => toggleOptions(company._id)}
                      className="flex items-center"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    {option === company._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-50">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <Edit2 className="w-4 mr-2" />
                          <span className="text-sm">Edit</span>
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

export default CompaniesTable;
