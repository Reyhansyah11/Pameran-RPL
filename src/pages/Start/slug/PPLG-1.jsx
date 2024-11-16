// src/pages/Start/slug/RPL-1.jsx
import React, { useState, useEffect } from "react";
import api from "../../../Api/api";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import { BsArrowRight } from "react-icons/bs";

function PPLG1() {
  const [galleries, setGalleries] = useState([]);
  const [topProjects, setTopProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const activeTab = location.pathname.includes("top-project")
    ? "top-project"
    : "gallery";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch galleries
        const galleriesResponse = await api.get(`/galleries/category/3`);
        setGalleries(galleriesResponse.data.data.galleries || []);

        // Fetch top projects
        const topProjectsResponse = await api.get("/top-projects/category/3");
        setTopProjects(topProjectsResponse.data.data.topProjects || []);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [location.pathname]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb jurusan="pplg-1" />

      <div className="grid grid-cols-1 mt-12 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeTab === "gallery" ? (
          galleries.length > 0 ? (
            galleries.map((gallery) => (
              <div
                key={gallery.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={gallery.image}
                  alt={gallery.name}
                  className="w-full h-[350px] object-cover rounded-xl"
                />
                <div className="p-4">
                  <div className="bg-red-600 text-white relative top-[-32px] text-center py-[5px] rounded-lg text-sm font-semibold border-white border">
                    {gallery.name}
                  </div>
                  <p className="text-gray-600 capitalize text-sm italic text-center my-2 px-4">
                    "{gallery.quote}"
                  </p>
                  <a
                    href={gallery.portfolio_url || `/profile/${gallery.id}`}
                    target={gallery.portfolio_url ? "_blank" : "_self"}
                    rel={gallery.portfolio_url ? "noopener noreferrer" : ""}
                    className="text-red-500 text-center font-light underline"
                  >
                    <p className="text-center">View Portfolio</p>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500">
              Tidak ada galeri terdaftar
            </div>
          )
        ) : topProjects.length > 0 ? (
          topProjects.map((project) => (
            <a
              key={project.id}
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 block"
            >
              <div className="relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 shadow-xl shadow-orange-500/50 rounded-b-lg">
                <h3 className="font-semibold text-lg mb-2 text-start">
                  {project.project_name}
                </h3>
                <p className="text-gray-600 text-sm text-start">
                  {project.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button className="text-orange-500 py-2 rounded">
                    View Online
                  </button>
                  <BsArrowRight className="text-orange-500" />
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            Tidak ada top project terdaftar
          </div>
        )}
      </div>
    </div>
  );
}

export default PPLG1;
