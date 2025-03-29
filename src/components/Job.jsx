import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  const navigate = useNavigate();
  // const jobId = "akjfkdfj";

  const daysAgoFunction = (mongodbTime)=>{
     const createdAt = new Date(mongodbTime);
     const currentTime = new Date();
     const timeDifference  = currentTime-createdAt;
     return  Math.floor(timeDifference/(1000 * 24 *60 * 60))
  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-300">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? "Today": `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button className="rounded-full " size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button>
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.locaion}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold outline-none"}>
          {job?.position} positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold outline-none"}>
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold outline-none"}>{job?.salary}LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button  onClick={()=> navigate(`/description/${job?._id}`)} className={'cursor-pointer'} >Details</Button>
        <Button className='bg-[#7209b7] cursor-pointer'>Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;
