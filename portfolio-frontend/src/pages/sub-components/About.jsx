import axios from 'axios';
import React, { useState, useEffect } from 'react';

const About = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        // Fetch user data from the backend
        const { data } = await axios.get("http://localhost:4000/api/v1/user/me/portfoilo", { 
          withCredentials: true 
        });

        if (data.success && data.user) {
          setUser(data.user); // Set the user data in state
        } else {
          setError("User data not found in the response.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getMyProfile(); // Call the function to fetch user data
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">Error: {error}</div>;
  }

  return (
    <div className='w-full flex flex-col overflow-x-hidden min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800'>
      {/* Heading Section */}
      <div className='relative'>
        {/* Heading with "ABOUT ME" */}
        <h1 className='flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold'>
          ABOUT
          <span className='text-tubeLight-effect font-extrabold'>ME</span>
        </h1>

        {/* Line below the heading */}
        <div className='absolute w-[90%] sm:w-[70%] md:w-[50%] h-1 left-1/2 transform -translate-x-1/2 top-15 sm:top-12 md:top-14 lg:top-16 bg-slate-200 dark:bg-gray-500'>
          {/* Dots on the left side */}
          <div className='absolute -left-6 top-1/2 transform -translate-y-1/2 flex gap-1'>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
          </div>

          {/* Dots on the right side */}
          <div className='absolute -right-6 top-1/2 transform -translate-y-1/2 flex gap-1'>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
          </div>

          {/* Moving black line */}
          <div
            className='absolute w-8 h-1 bg-blue-700 top-0 animate-move-line'
            style={{
              animation: 'moveLine 3s linear infinite',
            }}
          ></div>
        </div>
      </div>

      {/* Additional Content */}
      <div className='grid md:grid-cols-2 my-8 sm:my-12 gap-8 sm:gap-14 flex-grow'>
        {/* Image Section */}
        <div className='flex justify-center items-center'>
          <img
            src={user.avatar && user.avatar.url}
            alt={user.fullName || "User Avatar"}
            className='bg-white p-2 sm:p-4 rotate-[25deg] h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px]'
          />
        </div>

        {/* About Me Section */}
        <div className='flex justify-center flex-col tracking-[1px] text-base sm:text-xl gap-4 sm:gap-5'>
          <p>I am a full-stack developer with a strong foundation in modern web and mobile application development. 
            With expertise in both frontend and backend technologies, I specialize in building scalable, efficient,
             and user-friendly applications. My main focus areas are Java, React, Node.js, MongoDB, and MySQL. 
             I have experience working with various frontend frameworks, including React.js for web applications and React Native for mobile development.
 On the backend, I leverage Node.js and Express.js to create robust REST APIs and microservices, ensuring high performance and scalability.
  Additionally, I have hands-on experience working with relational and NoSQL databases, including MySQL, PostgreSQL, MS SQL, and MongoDB, allowing me to design optimized and structured data storage solutions.
          </p>
          <p>
          In terms of version control and collaboration, I am well-versed in Git and GitHub, 
          which helps me maintain efficient workflows, collaborate with teams, and manage code 
          repositories effectively.Currently, I am expanding my expertise by studying ASP.NET, Docker,
           and AWS hosting, which allows me to build more versatile and enterprise-level applications.
            Learning cloud computing and containerization enables me to deploy and manage applications 
            efficiently in various environments.
          </p>
        </div>
      </div>

      {/* Centered Paragraph */}
      <div className='w-full flex justify-center mb-8 sm:mb-12'>
        <p className='tracking-[1px] text-base sm:text-xl text-center max-w-2xl px-4'>
        Beyond development, I am also a tech blogger on Medium, where I share insights, tutorials, 
        and best practices on full-stack development, web technologies, and software engineering.
         I enjoy teaching, mentoring, and contributing to the developer community by writing articles 
         and sharing my knowledge with others.
        </p>
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

export default About;