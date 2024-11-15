import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SpecialLoadingButton from './SpecialLoadingButton';
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from '@/store/slices/userSlice';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // State initialization
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || '');
  const [portfolioURL, setPortfolioURL] = useState(user?.portfolioURL || '');
  const [linkedInURL, setLinkedURL] = useState(user?.linkedInURL || '');
  const [githubURL, setGithubURL] = useState(user?.githubURL || '');
  const [instagramURL, setInstagramURL] = useState(user?.instagramURL || '');
  const [facebookURL, setFacebookURL] = useState(user?.facebookURL || '');
  const [mediumURL, setMediumURL] = useState(user?.mediumURL || '');
  const [avatar, setAvatar] = useState(user?.avatar?.url || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '');
  const [resume, setResume] = useState(user?.resume?.url || '');
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || '');

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
    reader.readAsDataURL(file);
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('aboutMe', aboutMe);
    formData.append('portfolioURL', portfolioURL);
    formData.append('githubURL', githubURL);
    formData.append('linkedInURL', linkedInURL);
    formData.append('instagramURL', instagramURL);
    formData.append('facebookURL', facebookURL);
    formData.append('mediumURL', mediumURL);
    formData.append('avatar', avatar);
    formData.append('resume', resume);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, isUpdated, message]);

  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-[100%] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Update Profile</h1>
            <p className="mb-3">Update Your Profile</p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
            <div className="grid gap-2 w-full sm:w-72">
              <Label>Profile Image</Label>
              <img
                src={avatarPreview || './avatarHolder.jpg'}
                alt="avatar"
                className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
              />
              <input type="file" className="avatar-update-btn" onChange={avatarHandler} />
            </div>

            <div className="grid gap-2 w-full sm:w-72">
              <Label>Resume</Label>
              <Link to={resumePreview} target="_blank">
                <img
                  src={resumePreview || './avatarHolder.jpg'}
                  alt="resume"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
              </Link>
              <input type="file" className="avatar-update-btn" onChange={resumeHandler} />
            </div>
          </div>

          <InputField label="Full Name" value={fullName} onChange={setFullName} />
          <InputField label="Email" type="email" value={email} onChange={setEmail} />
          <InputField label="Phone" value={phone} onChange={setPhone} />
          <TextareaField label="About Me" value={aboutMe} onChange={setAboutMe} />
          <InputField label="Portfolio URL" value={portfolioURL} onChange={setPortfolioURL} />
          <InputField label="Github URL" value={githubURL} onChange={setGithubURL} />
          <InputField label="LinkedIn URL" value={linkedInURL} onChange={setLinkedURL} />
          <InputField label="Instagram URL" value={instagramURL} onChange={setInstagramURL} />
          <InputField label="Facebook URL" value={facebookURL} onChange={setFacebookURL} />
          <InputField label="Medium URL" value={mediumURL} onChange={setMediumURL} />

          <div className="grid gap-2">
            {!loading ? (
              <Button onClick={handleUpdateProfile} className="w-full">
                Update Profile
              </Button>
            ) : (
              <SpecialLoadingButton content="Updating" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, type = 'text' }) => (
  <div className="grid gap-2">
    <Label>{label}</Label>
    <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const TextareaField = ({ label, value, onChange }) => (
  <div className="grid gap-2">
    <Label>{label}</Label>
    <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export default UpdateProfile;

