import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile"); // Ensure "Profile" is capitalized

  return (
    <>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-5xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-5xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link 
              href="#" 
              onClick={() => setSelectedComponent("Profile")} 
              className={selectedComponent === "Profile" ? "font-semibold text-primary" : ""}
             
            >
              Profile
            </Link>
            
            <Link 
              to="#" 
              onClick={() => setSelectedComponent("Update Profile")} 
              className={selectedComponent === "Update Profile" ? "font-semibold text-primary" : ""}
            >
              Update Profile 
            </Link>
            <Link 
              to="#" 
              onClick={() => setSelectedComponent("Update Password")} 
              className={selectedComponent === "Update Password" ? "font-semibold text-primary" : ""}
            >
              Update Password 
            </Link>
          </nav>
          <div className="grid gap-6">
            {(() => {
              switch (selectedComponent) {
                case "Profile":
                  return <Profile />;
                case "Update Profile":
                  return <UpdateProfile />;
                case "Update Password":
                  return <UpdatePassword />;
                default:
                  return <Profile />; // default to Profile component
              }
            })()}
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
