import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading , setLoading] = useState(false);
    const {user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [input , setInput] = useState({
      fullname:user?.fullname,
      email:user?.email,
      phoneNumber:user?.phoneNumber,
      skills:user?.profile?.skills?.map(skill => skill) || [],
      bio:user?.profile?.bio,
      file:user?.profile?.resume
    });

          const changeEventHandler = (e)=>{
            setInput({ ...input, [e.target.name]:e.target.value});
          }

          const fileChangeHandler = (e)=>{
              const file = e.target.files?.[0];
              setInput({...input , file});

          }

          const submitHandler = async (e)=>{
            e.preventDefault();
            const formData = new FormData();
            formData.append("fullname",input.fullname);
            formData.append("email",input.email);
            formData.append("phoneNumber",input.phoneNumber);
            formData.append("bio",input.bio);
            formData.append("skills",input.skills);
            if(input.file){
                formData.append("file",input.file);
            }
                  try {
                    setLoading(true);
                     const res = await axios.post(`${USER_API_END_POINT}/updateProfile`,formData,{
                      headers:{
                        "Content-Type":'multipart/form-data'
                      },
                      withCredentials:true
                     });
                     if (res.data.success) {
                      dispatch(setUser(res.data.user));
                      toast.success(res.data.message);
                     }
                  } catch (error) {
                    console.log(error);
                    toast.error(error.response.data.message)
                  }finally{
                   setLoading(false)   
                  }
                  setOpen(false)
          }

  return (
    <div>
      <Dialog modal open={open} onOpenChange={setOpen}>
        <DialogContent className="fixed  z-[10000] bg-white shadow-lg sm:max-w-[425px]" onInteractOutside={()=> setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullname" className="text-right">
                  Name
                </Label>
                <Input id="fullname" name="fullname" type="text" className={"col-span-3"} value={input.fullname} onChange={changeEventHandler}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  email
                </Label>
                <Input id="email" type="email" name="email" className={"col-span-3"} value={input.email} onChange={changeEventHandler} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Number
                </Label>
                <Input id="number" type="number" name="phoneNumber" className={"col-span-3"} value={input.phoneNumber} onChange={changeEventHandler} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input id="bio" name="bio" className={"col-span-3"}  value={input.bio} onChange={changeEventHandler}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="skills" className="text-right">
    Skills
  </Label>
  <Input
    id="skills"
    name="skills"
    type="text"
    className="col-span-3"
    value={input.skills} 
    onChange={changeEventHandler}
    placeholder="Enter skills separated by commas"
  />
</div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input id="file" name="file" type="file" accept="application/pdf"  className={"col-span-3"} onChange={fileChangeHandler} />
              </div>
            </div>
            <DialogFooter>
            {
            loading ? <Button className="w-full my-4 bg-black text-white"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>:<Button type="submit" className="w-full my-4 cursor-pointer bg-black text-white">Update</Button>
          }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
