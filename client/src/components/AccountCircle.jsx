import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const AccountCircle = () => {

  const { logout, user } = useAuthContext();
  const navigate = useNavigate()
  const [isOpen, setOpen] = useState(false)

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    logout();
    navigate("/")
  };
  const handleAccountInfo = () => {
    // Handle account info logic here
    console.log('Viewing account info...');
    if (user) 
      navigate(`/user-info/${user.id}`)
  };

  const handleNotifications = () => {
    navigate(`/notifications`);
  }

  return (
    <div className="flex justify-end mr-4">
      <div className="relative inline-block text-left">
        <div>
          <button className="flex text-sm text-white focus:outline-none" onClick={() => setOpen(!isOpen)}>
            <div className="h-14 w-14 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 cursor-pointer">
              <svg className="h-12 w-12 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm5-8h-2v-1c0-2.76-2.24-5-5-5s-5 2.24-5 5v1H7c-1.1 0-2 .9-2 2v7h14v-7c0-1.1-.9-2-2-2zm-7-4c1.66 0 3 1.34 3 3v1H9v-1c0-1.66 1.34-3 3-3z"></path>
              </svg>
            </div>
          </button>
        </div>

        {/* Dropdown menu */}
        {isOpen && <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button onClick={handleAccountInfo} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Account Info</button>
            <button onClick={handleNotifications} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Notifications</button>
            <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Logout</button>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default AccountCircle;

