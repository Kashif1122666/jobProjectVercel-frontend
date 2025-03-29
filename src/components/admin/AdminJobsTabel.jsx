import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";

const AdminJobsTabel = () => {
  const {allAdminJobs,searchJobByText} = useSelector(store => store.job);
  const [filterJobs,SetFilterJobs]= useState(allAdminJobs);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||  job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    SetFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={'text-right'}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
        {

                 
filterJobs?.map((job ,index)=>(
                   
                         <tr key={index}>
                         
                         
                      
          <TableCell>{job?.company?.name}</TableCell>
          <TableCell>{job?.title}</TableCell>
          <TableCell>{job?.company?.createdAt.split("T")[0]}</TableCell>
          <TableCell className='text-right cursor-pointer'>
            <Popover>
                <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                <PopoverContent className="w-32  pl-7">
                   <div className="bg-white  rounded-sm">
                   <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer ">
                        <Edit2 className="w-4"/>
                        <span>Edit</span>
                    </div>
                    <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center bg-white w-fit gap-2 cursor-pointer mt-2">
                      <Eye className="w-4"/>
                      <span>applicants</span>
                    </div>
                   </div>
                </PopoverContent>
            </Popover>
          </TableCell>

                         </tr>
                    
                  )
                )
              }
          
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTabel;
