import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Button } from "../../components/ui/button";

const Portfolio = () => {
  const [projects, setProjects] = useState([]); // Initialize projects as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [viewAll, setViewAll] = useState(false); // State to toggle between viewing all projects or a subset

  // Fetch projects from the backend
  useEffect(() => {
    const getMyProjects = async () => {
      try {
        // Fetch projects from the backend
        const { data } = await axios.get("http://localhost:4000/api/v1/project/getall", {
          withCredentials: true,
        });

        if (data.success && data.projects) {
          setProjects(data.projects); // Set the projects in state
        } else {
          setError("No projects found in the response.");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    getMyProjects(); // Call the function to fetch projects
  }, []);

  return (
    <div className='w-full flex flex-col overflow-x-hidden min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800'>
      {/* Heading Section */}
      <div className='relative'>
        {/* Heading with "MY PORTFOLIO" */}
        <h1 className='flex gap-4 items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[10px] sm:tracking-[15px] mx-auto w-fit font-extrabold'>
          MY
          <span className='text-tubeLight-effect font-extrabold'>PROJECTS</span>
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

        {/* Projects Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 sm:mt-16'>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            (viewAll ? projects : projects.slice(0, 6)).map((project) => (
              <Link to={`/project/${project._id}`} key={project._id} className='group'>
                <div className='relative overflow-hidden rounded-lg shadow-lg h-48 sm:h-64'>
                  {/* Project Image */}
                  <div className='w-full h-full overflow-hidden'>
                    <img
                      src={project.projectBanner?.url}
                      alt={project.title}
                      className='w-full h-full object-cover transform scale-110 transition-transform duration-500 ease-in-out group-hover:scale-100'
                    />
                  </div>
                  {/* Project Title Overlay */}
                  <div className='absolute inset-0 flex items-end bg-opacity-40 p-2 sm:p-4'>
                    <h2 className='text-white text-lg sm:text-xl font-bold'>{project.title}</h2>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* View All Button */}
        {projects && projects.length > 6 && (
          <div className='w-full text-center mt-6 sm:mt-9'>
            <Button className="w-40 text-gray-600  sm:w-52" onClick={() => setViewAll(!viewAll)}>
              {viewAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
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

export default Portfolio;