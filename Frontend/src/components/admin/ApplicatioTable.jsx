// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@radix-ui/react-popover";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { useNavigate } from "react-router-dom";
// import { MoreHorizontal } from "lucide-react";

// const sortListingStatus = ["Accepted", "Rejected"];

// function ApplicationTable() {
//   const navigate = useNavigate();

//   return (
//     <div className="overflow-x-auto">
//       <Table className="min-w-full table-auto border-collapse">
//         <TableCaption className="text-left font-medium py-3">
//           A List Of Your Recently Applied Users
//         </TableCaption>
//         <TableHeader className="bg-gray-200">
//           <TableRow>
//             <TableHead className="px-4 py-2 text-left">Full Name</TableHead>
//             <TableHead className="px-4 py-2 text-left">Email</TableHead>
//             <TableHead className="px-4 py-2 text-left">Contact</TableHead>
//             <TableHead className="px-4 py-2 text-left">Resume</TableHead>
//             <TableHead className="px-4 py-2 text-left">Date</TableHead>
//             <TableHead className="px-4 py-2 text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           <TableRow>
//             <TableCell className="border px-4 py-2">John Doe</TableCell>
//             <TableCell className="border px-4 py-2">
//               johndoe@example.com
//             </TableCell>
//             <TableCell className="border px-4 py-2">+123456789</TableCell>
//             <TableCell className="border px-4 py-2">
//               <a href="#">View Resume</a>
//             </TableCell>
//             <TableCell className="border px-4 py-2">2024-08-24</TableCell>
//             <TableCell className="border px-4 py-2 text-right">
//               <Popover>
//                 <PopoverTrigger>
//                   <MoreHorizontal />
//                 </PopoverTrigger>
//                 <PopoverContent className="w-32 cursor-pointer">
//                   {sortListingStatus.map((status, index) => {
//                     return (
//                       <div key={index}>
//                         <span>{status}</span>
//                       </div>
//                     );
//                   })}
//                 </PopoverContent>
//               </Popover>
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

// export default ApplicationTable;
