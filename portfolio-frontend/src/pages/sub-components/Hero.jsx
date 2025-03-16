import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa'; // Importing icons from react-icons
import { ExternalLink } from 'lucide-react';
import profileImage from '../../images/profile.jpeg'; // Adjust the path to your local image
import backgroundImage from '../../images/background.jpg'; // Import the background image

const Hero = () => {
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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div 
      className='w-full flex flex-col md:flex-row justify-between items-center p-4 overflow-x-hidden min-h-screen relative'
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        backgroundSize: 'cover', // Ensure the background covers the entire area
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Prevent the background from repeating
      }}
    >
      {/* Gradient Overlay for Left Side */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)', // Darker on the left, fading to transparent
        }}
      ></div>

      {/* Left Side Content */}
      <div className='w-full md:w-2/3 flex flex-col justify-center items-center md:items-start text-center md:text-left relative z-10 p-4'>
        {/* Online Indicator */}
        <div className='flex items-center gap-2 mb-2'>
          <span className='bg-green-400 rounded-full h-2 w-2'></span>
          <p className="text-white">Online</p>
        </div>

        {/* Full Name */}
        <div>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[2px] mb-4 text-white'>
            Hey, I'm {user.fullName || "Guest"}
          </h1>
        </div>

        {/* Static Text with Typing Animation */}
        <div className='w-full overflow-hidden'>
          <h1
            className='typing-animation'
            style={{
              overflow: 'hidden', // Ensures the text is hidden until the typing effect completes
              whiteSpace: 'nowrap', // Keeps the text on a single line for larger screens
              borderRight: '0.15em solid orange', // Adds a caret effect
              animation: 'typing 10s steps(40, end) infinite, blink-caret 0.75s step-end infinite',
              fontSize: '1.2rem',
              lineHeight: '1.5',
              fontWeight: 'bold',
              color: '#fff', // Adjust text color as needed
            }}
          >
            FREELANCER, WEB DEVELOPER, MOBILE APP DEVELOPER, DESKTOP APP DEVELOPER
          </h1>
        </div>

        {/* Social Media Icons */}
        <div className='w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-3 sm:gap-5 items-center mt-4 md:mt-8 lg:mt-10'>
          {/* YouTube Icon */}
          <Link to={user.youtubeURL || "/"} target='_blank'>
            <FaYoutube className='text-red-500 w-6 h-6 sm:w-7 sm:h-7' />
          </Link>

          {/* Instagram Icon */}
          <Link to={user.instegramURL || "/"} target='_blank'>
            <FaInstagram className="text-pink-500 w-6 h-6 sm:w-7 sm:h-7" />
          </Link>

          {/* Facebook Icon */}
          <Link to={user.facebookURL || "https://web.facebook.com/profile.php?id=100073905847454"} target='_blank'>
            <FaFacebook className='text-blue-800 w-6 h-6 sm:w-7 sm:h-7' />
          </Link>

          {/* LinkedIn Icon */}
          <Link to={user.linkedInURL || "https://www.linkedin.com/in/ushan-dissanayaka-01upd/"} target='_blank'>
            <FaLinkedin className='text-sky-500 w-6 h-6 sm:w-7 sm:h-7' />
          </Link>

          {/* GitHub Icon */}
          <Link to={user.githubURL || "https://github.com/ushandissanayaka"} target='_blank'>
            <FaGithub className='text-black w-6 h-6 sm:w-7 sm:h-7' />
          </Link>
        </div>

        {/* Buttons for GitHub and Resume */}
        <div className='mt-4 md:mt-8 lg:mt-10 flex gap-3 flex-wrap justify-center'>
          {/* GitHub Button */}
          <Link to={user.githubURL || "https://github.com/ushandissanayaka"} target='_blank'>
            <button className='rounded-[30px] flex items-center gap-2 flex-row px-4 py-2 bg-blue-500 text-black hover:bg-blue-600 transition-colors'>
              <span>
                <FaGithub />
              </span>
              <span>Github</span>
            </button>
          </Link>

          {/* Resume Button */}
          {user.resume && user.resume.url && (
            <Link to={user.resume.url} target='_blank'>
              <button className='rounded-[30px] flex items-center gap-2 flex-row px-4 py-2 bg-green-500 text-black hover:bg-green-600 transition-colors'>
                <span>
                  <ExternalLink />
                </span>
                <span>Resume</span>
              </button>
            </Link>
          )}
        </div>

        {/* About Me Section */}
        <p className='mt-8 text-lg sm:text-xl tracking-[2px] text-white text-center md:text-left'>{user.aboutMe}</p>
        <hr className='my-8 md:my-10 w-full max-w-2xl border-gray-700' />
      </div>

      {/* Right Side - Profile Image */}
      <div className='w-full md:w-1/3 flex justify-center md:justify-end mt-8 md:mt-0 relative z-10 p-4'>
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
          <img
            src={profileImage} // Use the imported local image
            alt="Profile"
            className='rounded-full border-4 border-white shadow-lg w-full h-full object-cover'
          />
          {/* First Spinning Border (Clockwise - Dotted) */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-700 border-r-pink-700 animate-spin-clockwise" style={{ borderStyle: 'dotted' }}></div>
          {/* Second Spinning Border (Counter-Clockwise - Solid) */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-blue-700 border-l-blue-700 animate-spin-counter-clockwise"></div>
        </div>
      </div>

      {/* Inline CSS for Typing Animation and Border Animations */}
      <style>
        {`
          @keyframes typing {
            0% {
              width: 0;
            }
            50% {
              width: 100%;
            }
            100% {
              width: 0;
            }
          }

          @keyframes blink-caret {
            from, to {
              border-color: transparent;
            }
            50% {
              border-color: orange;
            }
          }

          @keyframes spin-clockwise {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes spin-counter-clockwise {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }

          .animate-spin-clockwise {
            animation: spin-clockwise 3s linear infinite;
          }

          .animate-spin-counter-clockwise {
            animation: spin-counter-clockwise 3s linear infinite;
          }

          /* Typing Animation for Mobile Devices */
          @media (max-width: 768px) {
            .typing-animation {
              white-space: normal; /* Allow text to wrap */
              font-size: 1rem; /* Smaller font size for mobile */
              line-height: 1.4; /* Adjust line height for better readability */
              animation: none; /* Disable typing animation for mobile */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Hero;