import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { toast } from "react-toastify";
import { addNewTimeline, clearAllTimelineErrors, getAllTimeline, resetTimelineState } from "@/store/slices/timelineSlice";

const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState(""); // Corrected state name
  const [to, setTo] = useState("");

  const { loading, error, message } = useSelector((state) => state.timeline);
  const dispatch = useDispatch();

  const handleAddNewTimeline = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from); // Corrected field name
    formData.append("to", to);

    dispatch(addNewTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineState());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:py-4 sm:pl-14">
      <form className="w-full px-5 md:w-[650px]" onSubmit={handleAddNewTimeline}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold text-gray-900 text-3xl text-center">ADD A NEW TIMELINE</h2>
            
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full">
                <Label className="block text-sm font-medium text-gray-900">Title</Label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full border rounded-md py-1.5 px-3"
                />
              </div>

              <div className="w-full">
                <Label className="block text-sm font-medium text-gray-900">Description</Label>
                <Textarea
                  placeholder="Timeline Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full border rounded-md py-1.5 px-3"
                />
              </div>

              <div className="w-full">
                <Label className="block text-sm font-medium text-gray-900">From</Label>
                <input
                  type="number"
                  placeholder="Starting Period"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="block w-full border rounded-md py-1.5 px-3"
                />
              </div>

              <div className="w-full">
                <Label className="block text-sm font-medium text-gray-900">To</Label>
                <input
                  type="number"
                  placeholder="Ending Period"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="block w-full border rounded-md py-1.5 px-3"
                />
              </div>
            </div>
          </div>

          {loading ? <SpecialLoadingButton content="Adding..." /> : <Button type="submit" className="w-full">Add Timeline</Button>}
        </div>
      </form>
    </div>
  );
};

export default AddTimeline;
