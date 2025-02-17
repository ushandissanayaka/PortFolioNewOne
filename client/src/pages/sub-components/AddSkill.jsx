import { addNewSkill, clearAllSkillSliceErrors, getAllSkills, resetSkillSlice } from '@/store/slices/skillsSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Image, PhoneOutgoingIcon } from 'lucide-react';

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [svg, setSvg] = useState(null);
  const [svgPreview, setSvgPreview] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.skill);

  const handleSvg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSvg(file);
        setSvgPreview(reader.result);
      };
    }
  };

  const handleAddNewSkill = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("svg", svg);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);

    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:py-4 sm:pl-14">
      <form className="w-full px-5 md:w-[650px]" onSubmit={handleAddNewSkill}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold text-gray-900 text-3xl text-center">ADD A NEW SKILL</h2>

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
                <Label className="block text-sm font-medium text-gray-900">Proficienct</Label>
                <input
                  type="number"
                  placeholder="30"
                  value={proficiency}
                  onChange={(e) => setProficiency(e.target.value)}
                  className="block w-full border rounded-md py-1.5 px-3"
                />
              </div>
            </div>
          </div>



          <div className="col-span-full">
              <label className="block text-sm/6 font-medium text-gray-900">
               skills SVG
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {
                    svgPreview ? (
                      <img className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      src={svgPreview ? `${svgPreview}` : ""}/>
                    ): ( <Image className="mx-auto h-12 w-12 text-gray-300"
                    orio-hidden="true"/>)
                  }
                
                  
                 
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                      id="file-upload"
                      name="file-upload"
                       type="file" className="sr-only"
                      onChange={handleSvg} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>



          {loading ? (
            <SpecialLoadingButton content="Adding..." />
          ) : (
            <Button type="submit" className="w-full">Add Skill</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
 