// components/TopProjects.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Api/api";
import { BsArrowRight } from "react-icons/bs";

const Home = () => {
  const [topProjects, setTopProjects] = useState([]);

  useEffect(() => {
    const fetchTopProjects = async () => {
      try {
        const response = await api.get("/top-projects"); // Panggil endpoint tanpa base URL
        if (response.data.status === "success") {
          setTopProjects(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching top projects:", error);
      }
    };

    fetchTopProjects();
  }, []);

  return (
    <div className="p-6 mt-[80px]">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
        {topProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={project.thumbnail}
              alt={project.project_name}
              className="w-full h-auto object-cover rounded-lg "
            />
            <div className="p-4 shadow-xl shadow-orange-500/50 rounded-md">
              <h2 className="text-lg font-bold text-start mt-6">
                {project.project_name}
              </h2>
              <p className="text-gray-600 text-start">{project.description}</p>
              <div className="mt-4">
                <Link
                  to={`${project.url_project}`}
                  className="flex justify-between mt-4"
                >
                  <button className="text-orange-500 justify-start py-2 rounded">
                    View Online
                  </button>
                  <button className="text-orange-500 justify-end py-2 rounded">
                    <BsArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link to={"/start"}>
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-[1px] px-4 rounded">
            Start
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
