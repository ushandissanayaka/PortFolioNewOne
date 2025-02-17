import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Image } from 'lucide-react';

import { 
  addNewSoftwareApplication, 
  clearAllApplicationSliceErrors, 
  getAllSoftwareApplications, 
  resetApplicationSlice 
} from '@/store/slices/softwareApplicationSlice';

const AddApplication = () => {
  const [name, setName] = useState("");
  const [svg, setSvg] = useState(null);
  const [svgPreview, setSvgPreview] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.softwareApplication);

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

  const handleAddNewApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("svg", svg);

    dispatch(addNewSoftwareApplication(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:py-4 sm:pl-14">
      <form className="w-full px-5 md:w-[650px]" onSubmit={handleAddNewApplication}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold text-gray-900 text-3xl text-center">ADD A NEW SOFTWARE APPLICATION</h2>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full">
                <Label className="block text-sm font-medium text-gray-900">
                  Software Application Name
                </Label>
                <input
                  type="text"
                  placeholder="Android Studio"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full border rounded-md py-1.5 px-3"
                  required
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-900">
              Software Application's SVG
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {svgPreview ? (
                  <img
                    className="mx-auto h-12 w-12"
                    src={svgPreview}
                    alt="SVG Preview"
                  />
                ) : (
                  <Image className="mx-auto h-12 w-12 text-gray-300" />
                )}
                <div className="mt-4 flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".svg,.png,.jpg,.jpeg,.gif"
                      onChange={handleSvg}
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="mt-2 text-xs text-gray-600">SVG, PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {loading ? (
            <SpecialLoadingButton content="Adding..." />
          ) : (
            <Button type="submit" className="w-full">
              Add Application
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddApplication;
