import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaYoutube, FaMedium, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa'; // Importing icons from react-icons
import { ExternalLink } from 'lucide-react';
import Plasma from '../../components/ui/Plasma';

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

  // Profile Image Markup
  const profileImage = (
    <div className="relative aspect-square flex-shrink-0 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[400px] lg:h-[400px] hero-profile-animation">
      {user.avatar && user.avatar.url ? (
        <img
          src={user.avatar.url}
          alt={user.fullName || "Profile"}
          className='rounded-full border-8 border-[#B2BEB5] shadow-[0_0_25px_rgba(255,255,255,0.8)] w-full h-full object-cover'
        />
      ) : (
        <div className='rounded-full border-8 border-[#B2BEB5] shadow-[0_0_25px_rgba(255,255,255,0.8)] w-full h-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600'>
          {user.fullName ? user.fullName.charAt(0) : "G"}
        </div>
      )}
    </div>
  );

  return (
    <div className='w-full flex flex-col md:flex-row justify-between items-center p-4 min-h-screen relative overflow-hidden bg-black'>

      {/* Plasma animated background */}
      <div className="absolute inset-0 z-0">
        <Plasma
          color="#6940FF"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.8}
          mouseInteractive={true}
        />
      </div>

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)' }}
      />

      {/* Left Side Content */}
      <div className='w-full md:w-1/2 lg:w-2/3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left relative z-10 p-4'>
        {/* Online Indicator */}
        <div className='flex items-center gap-2 mb-2'>
          <span className='bg-green-400 rounded-full h-2 w-2'></span>
          <p className="text-white">Online</p>
        </div>

        {/* Full Name */}
        <div>
          <h1 className='text-tubeLight-effect font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[2px] mb-4 text-white'>
            Hey, I'm {user.fullName || "Guest"}
          </h1>
        </div>

        {/* Mobile Profile Image - Under Name */}
        <div className="md:hidden flex justify-center w-full my-6">
          {profileImage}
        </div>

        {/* Static Text with Typing Animation */}
        <div className='w-full max-w-[600px] overflow-hidden'>
          <h1
            className='typing-animation'
            style={{
              overflow: 'hidden', // Ensures the text is hidden until the typing effect completes
              whiteSpace: 'nowrap', // Keeps the text on a single line for larger screens
              borderRight: '0.15em solid orange', // Adds a caret effect
              animation: 'typing 10s steps(100, end) infinite, blink-caret 0.75s step-end infinite',
              fontSize: '1.2rem',
              lineHeight: '1.5',
              fontWeight: 'bold',
              color: '#fff', // Adjust text color as needed
              width: '0', // Start with 0 width for typing effect
            }}
          >
            FREELANCER,WEB DEVELOPER, MOBILE APP DEVELOPER, WEB DESIGNER, CONTENT CREATOR, EDITOR
          </h1>
        </div>

        {/* Social Media Icons */}
        <div className='w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-3 sm:gap-5 items-center mt-4 md:mt-8 lg:mt-10'>
          {/* LinkedIn Icon */}
          <Link to={user.linkedInURL || "https://www.linkedin.com/in/ushan-dissanayaka-01upd/"} target='_blank'>
            <FaLinkedin className='text-sky-500 w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 hover:scale-125 active:scale-110' />
          </Link>

          {/* GitHub Icon */}
          <Link to={user.githubURL || "https://github.com/ushandissanayaka"} target='_blank'>
            <FaGithub className='text-black w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 hover:scale-125 active:scale-110' />
          </Link>

          {/* YouTube Icon */}
          <Link to={user.youtubeURL || ""} target='_blank'>
            <FaYoutube className='text-red-500 w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 hover:scale-125 active:scale-110' />
          </Link>

          {/* Medium Icon */}
          <Link to={user.mediumURL || "https://medium.com/@ushandissanayaka879"} target='_blank'>
            <FaMedium className="text-black w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 hover:scale-125 active:scale-110" />
          </Link>

          {/* Facebook Icon */}
          <Link to={user.facebookURL || "https://web.facebook.com/profile.php?id=100073905847454"} target='_blank'>
            <FaFacebook className='text-blue-800 w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 hover:scale-125 active:scale-110' />
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
        <p className='mt-8 text-lg sm:text-xl tracking-[2px] text-white text-center lg:text-left'>{user.aboutMe}</p>
        <hr className='my-8 md:my-10 w-full max-w-2xl border-gray-700' />
      </div>

      {/* Right Side - Profile Image (Desktop Only) */}
      <div className='hidden md:flex w-full md:w-1/2 lg:w-1/3 justify-center lg:justify-end mt-8 md:mt-0 relative z-10 p-4'>
        {profileImage}
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

          @keyframes hero-bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
            60% { transform: translateY(-10px); }
          }

          .hero-profile-animation {
            animation: hero-bounce 3s infinite ease-in-out;
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