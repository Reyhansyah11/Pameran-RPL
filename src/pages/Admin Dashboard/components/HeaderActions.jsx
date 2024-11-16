// pages/Admin Dashboard/components/HeaderActions.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="lg:text-2xl text-lg font-bold">Admin Dashboard</h1>
      
      <div className="flex gap-2">
        <button
          onClick={() => navigate('/rute-gallery')}
          className="bg-blue-500 text-white lg:px-4 lg:py-2 px-1 py-1 rounded-md hover:bg-blue-600"
        >
          Gallery
        </button>
        <button
          onClick={() => navigate('/rute-project')}
          className="bg-green-500 text-white lg:px-4 lg:py-2 px-1 py-1 rounded-md hover:bg-green-600"
        >
          Top Project
        </button>
      </div>
    </div>
  );
};

export default HeaderActions;
