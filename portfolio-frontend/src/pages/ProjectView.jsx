import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProjectsView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState([]); // Initialize as an array
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState(false); // Initialize as boolean
  const [projectBanner, setProjectBanner] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        });
        const project = res.data.project;
        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setTechnologies(project.technologies || []); // Ensure it's an array
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBanner(project.projectBanner?.url || null);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch project details");
      }
    };

    getProjects();
  }, [id]);

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center'>
      {/* Main Content */}
      <div className='w-full max-w-4xl mx-4 sm:mx-6 lg:mx-8'>
        {/* Heading with "PROJECT DETAILS" */}
        <div className='relative w-full text-center'>
          <h1 className='flex gap-4 items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[10px] sm:tracking-[15px] mx-auto w-fit font-extrabold'>
            PROJECT
            <span className='text-tubeLight-effect font-extrabold'>DETAILS</span>
          </h1>

          {/* Line below the heading */}
          <div className='absolute w-[90%] sm:w-[70%] md:w-[50%] h-1 left-1/2 transform -translate-x-1/2 top-15 sm:top-12 md:top-14 lg:top-16 bg-slate-200 dark:bg-gray-500'>
            {/* Dots on the left side */}
            <div className='absolute -left-4 sm:-left-6 top-1/2 transform -translate-y-1/2 flex gap-1'>
              <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
              <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
              <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            </div>

            {/* Dots on the right side */}
            <div className='absolute -right-4 sm:-right-6 top-1/2 transform -translate-y-1/2 flex gap-1'>
              <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
              <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
              <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            </div>

            {/* Moving black line */}
            <div
              className='absolute w-8 h-1 bg-blue-800 top-0 animate-move-line'
              style={{
                animation: 'moveLine 3s linear infinite',
              }}
            ></div>
          </div>
        </div>

        {/* Project Details Card */}
        <div className='w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8 sm:mt-16'>
          {projectBanner && (
            <div className='mb-6'>
              <img
                src={projectBanner}
                alt="Project Banner"
                className='w-full h-auto rounded-lg'
              />
            </div>
          )}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Title</label>
              <input
                type="text"
                value={title}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Description</label>
              <textarea
                value={description}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white h-32'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Git Repo Link</label>
              <a
                href={gitRepoLink}
                target="_blank"
                rel="noopener noreferrer"
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 block'
              >
                {gitRepoLink}
              </a>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Project Link</label>
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 block'
              >
                {projectLink}
              </a>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Technologies</label>
              <input
                type="text"
                value={technologies.join(", ")} // Convert array to string
                readOnly
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Stack</label>
              <input
                type="text"
                value={stack}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Deployed?</label>
              <input
                type="text"
                value={deployed ? "Yes" : "No"}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS for the moving line animation */}
      <style>
        {`
          @keyframes moveLine {
            0% {
              left: 0;
            }
            50% {
              left: calc(100% - 2rem); /* Adjust based on the width of the line */
            }
            100% {
              left: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProjectsView;