import React, { useEffect, useState } from "react";
import api from "../../../Api/api";
import HeaderActions from "./HeaderActions";
import { FaEdit, FaTrash } from "react-icons/fa";

const TopProject = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]); // New state for categories
  const [formData, setFormData] = useState({
    project_name: "",
    thumbnail: "",
    description: "",
    url_project: "",
    category_id: "", // Added category_id to formData
  });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProjects();
    fetchCategories(); // Fetch categories when component mounts
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('admin/categories', {
        withCredentials: true
      });
      setCategories(response.data.data);
    } catch (err) {
      setError('Error fetching categories');
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get(
        "/admin/top-projects",
        { withCredentials: true }
      );
      setProjects(response.data.data);
    } catch (error) {
      setError('Error fetching projects');
      console.error("Error fetching projects:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProjectId) {
        await api.put(
          `/admin/top-project/${editingProjectId}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await api.post(
          "/admin/top-project",
          formData,
          { withCredentials: true }
        );
      }
      fetchProjects();
      resetForm();
      setError(null);
    } catch (error) {
      setError('Error saving project');
      console.error("Error saving project:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      project_name: "",
      thumbnail: "",
      description: "",
      url_project: "",
      category_id: "", // Reset category_id
    });
    setEditingProjectId(null);
  };

  const handleEdit = (project) => {
    setFormData({
      project_name: project.project_name,
      thumbnail: project.thumbnail,
      description: project.description,
      url_project: project.url_project,
      category_id: project.category_id, // Include category_id when editing
    });
    setEditingProjectId(project.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.delete(`/admin/top-project/${id}`, {
        withCredentials: true,
      });
      fetchProjects();
      setError(null);
    } catch (error) {
      setError('Error deleting project');
      console.error("Error deleting project:", error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <HeaderActions />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-4 bg-white p-4 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-2">
          {editingProjectId ? "Edit Top Project" : "Add Top Project"}
        </h2>

        <div className="mb-2">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
            placeholder="Project Name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Thumbnail:</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail URL"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Project URL:</label>
          <input
            type="text"
            name="url_project"
            value={formData.url_project}
            onChange={handleChange}
            placeholder="Project URL"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* New Category Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700">Category:</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name_jurusan}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            {editingProjectId ? "Update Project" : "Add Project"}
          </button>
          
          {editingProjectId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Project Name</th>
            <th className="border px-4 py-2 hidden md:table-cell">Thumbnail</th>
            <th className="border px-4 py-2 hidden md:table-cell">Category</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((project, index) => (
            <tr key={project.id}>
              <td className="border px-4 py-2 text-center">{index + 1 + indexOfFirstItem}</td>
              <td className="border px-4 py-2 text-center">{project.project_name}</td>
              <td className="border px-4 py-2 hidden md:table-cell lg:flex justify-center items-center">
                <img
                  src={project.thumbnail}
                  alt={project.project_name}
                  className="w-16"
                />
              </td>
              <td className="border px-4 py-2 text-center hidden md:table-cell">
                {categories.find(cat => cat.id === project.category_id)?.name_jurusan || 'N/A'}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleEdit(project)}
                  className="text-blue-500 hover:text-blue-700 p-1 rounded mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 p-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 p-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TopProject;