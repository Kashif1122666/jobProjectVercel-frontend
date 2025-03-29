import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const AppliedJobTable = () => {
  useGetAppliedJobs();
  const {allAppliedJobs} = useSelector(store=> store.job);

  return (
    <div>
      <Table>
        <TableCaption>List of your applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="  ">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length <= 0 ?     <TableRow>
      <TableCell >
        You haven't applied for any job yet
      </TableCell>
    </TableRow>
     :  allAppliedJobs?.map((appliedJob) => (
            <TableRow key={appliedJob?._id}>
              <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
              <TableCell>{appliedJob?.job?.title}</TableCell>
              <TableCell>{appliedJob?.job?.company?.name}</TableCell>
              <TableCell  >
                <Badge className={`px-2 text-sm font-medium rounded-full w-[100px] ${ appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob?.status === "pending" ? 'bg-gray-400': 'bg-green-400'}`}  >{appliedJob?.status.toUpperCase()}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
