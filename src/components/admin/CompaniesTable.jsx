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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const {companies,searchCompanyByText} = useSelector(store=> store.company);
  const [filterCompany,SetFilterCompany]= useState(companies || []);
  const navigate = useNavigate();
  useEffect(()=>{
      const filteredCompany = companies.length > 0 ? companies.filter((company)=>{
        if(!searchCompanyByText){
          return true
        };
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      }) :[];
      SetFilterCompany(filteredCompany);
  },[companies,searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={'text-right'}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
        {

                 
                filterCompany?.map((company)=>(
                   
                         <tr>
                         
                         
                         <TableCell>
            <Avatar>
              <AvatarImage src={company.logo} />
            </Avatar>
          </TableCell>
          <TableCell>{company.name}</TableCell>
          <TableCell>{company.createdAt.split("T")[0]}</TableCell>
          <TableCell className='text-right cursor-pointer'>
            <Popover>
                <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                <PopoverContent className="w-32  pl-7">
                    <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer ">
                        <Edit2 className="w-4"/>
                        <span>Edit</span>
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

export default CompaniesTable;
