import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import AccountCircle from './AccountCircle';

const Banner = ({ goBackPath, showGoBackButton = true }) => { // Added showGoBackButton prop with a default value
  const navigate = useNavigate();
  const { user } = useAuthContext();

  return (
    <div className="flex items-center justify-between bg-blue-500 py-5 px-8 text-white mb-4 mr-5 w-full">
      <Link to="/apppage" className="text-2xl font-bold">Stony Brook Medical 360</Link>
      <div className="flex items-center space-x-4">
        {user && <div className="text-xl font-semibold text-white-800">{user.name}</div>}
        {showGoBackButton && ( // Use the new prop to conditionally render the Go Back button
          <button onClick={() => navigate(goBackPath)} className="text-sm font-medium bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">
            Go Back
          </button>
        )}
        <AccountCircle />
      </div>
    </div>
  );
};

export default Banner;
