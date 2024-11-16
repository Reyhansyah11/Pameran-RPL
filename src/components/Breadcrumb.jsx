import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaImages, FaTrophy } from 'react-icons/fa';

function Breadcrumb({ className, jurusan }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState(
    location.pathname.includes('top-project') ? 'top-project' : 'gallery'
  );

  return (
    <div className={`inline-flex mt-[50px] items-center px-3 py-1 bg-gray-100 rounded-md border border-gray-300 ${className}`}>
      {/* Link ke Gallery */}
      <Link
        to={`/${jurusan}/gallery`}
        className={`flex items-center px-2 py-1 rounded-md transition-colors duration-200 ${
          activeTab === 'gallery' ? 'text-blue-600 bg-blue-100' : 'text-gray-600 hover:text-blue-500'
        }`}
        onClick={() => setActiveTab('gallery')}
      >
        <FaImages className="mr-1" />
        {activeTab !== 'gallery' && <span>Gallery</span>}
      </Link>

      <span className="text-gray-400 mx-2">/</span>

      {/* Link ke Top Project */}
      <Link
        to={`/${jurusan}/top-project`}
        className={`flex items-center px-2 py-1 rounded-md transition-colors duration-200 ${
          activeTab === 'top-project' ? 'text-blue-600 bg-blue-100' : 'text-gray-600 hover:text-blue-500'
        }`}
        onClick={() => setActiveTab('top-project')}
      >
        <FaTrophy className="mr-1" />
        {activeTab !== 'top-project' && <span>Top Project</span>}
      </Link>
    </div>
  );
}

export default Breadcrumb;
