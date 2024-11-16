import React, { useState, useEffect } from "react";
import api from "../../../Api/api";
import HeaderActions from "./HeaderActions";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quote: "",
    image: "",
    portfolio_url: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories();
      await fetchGalleries();
    };
    loadData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/admin/categories", {
        withCredentials: true,
      });
      setCategories(response.data.data);
    } catch (err) {
      setError("Error fetching categories");
    }
  };

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/galleries`, {
        withCredentials: true,
      });
      setItems(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching galleries");
    } finally {
      setLoading(false);
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const config = {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      if (editMode) {
        await api.put(`/admin/gallery/${currentId}`, formData, config);
      } else {
        await api.post(`/admin/gallery`, formData, config);
      }
      
      fetchGalleries();
      clearForm();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      quote: item.quote,
      image: item.image,
      portfolio_url: item.portfolio_url,
      category_id: item.category_id || '',
    });
    setEditMode(true);
    setCurrentId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      setLoading(true);
      await api.delete(`/admin/gallery/${id}`, {
        withCredentials: true,
      });
      fetchGalleries();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting gallery");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      quote: "",
      image: "",
      portfolio_url: "",
      category_id: "",
    });
    setEditMode(false);
    setCurrentId(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="p-6">
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
          {editMode ? "Edit Gallery Item" : "Add Gallery Item"}
        </h2>

        <div className="mb-2">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Quote:</label>
          <input
            type="text"
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Portfolio URL:</label>
          <input
            type="text"
            name="portfolio_url"
            value={formData.portfolio_url}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

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
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name_jurusan}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Processing..." : editMode ? "Update Item" : "Add Item"}
          </button>

          {editMode && (
            <button
              type="button"
              onClick={clearForm}
              className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-2">Gallery Items</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Name</th>
              <th className="border-b px-4 py-2 hidden md:table-cell">Quote</th>
              <th className="border-b px-4 py-2 hidden md:table-cell">Category</th>
              <th className="border-b px-4 py-2 hidden md:table-cell">Image</th>
              <th className="border-b px-4 py-2 hidden md:table-cell">Portfolio URL</th>
              <th className="border-b px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && currentItems.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No items found
                </td>
              </tr>
            )}
            {!loading &&
              currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="border-b px-4 py-2 text-center">
                    {index + 1 + indexOfFirstItem}
                  </td>
                  <td className="border-b px-4 py-2 text-center">
                    {item.name}
                  </td>
                  <td className="border-b px-4 py-2 text-center hidden md:table-cell">
                    {item.quote}
                  </td>
                  <td className="border-b px-4 py-2 text-center hidden md:table-cell">
                    {categories.find(
                      (cat) => Number(cat.id) === Number(item.category_id)
                    )?.name_jurusan || "N/A"}
                  </td>
                  <td className="border-b px-4 py-2 hidden md:table-cell lg:flex justify-center items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border-b px-4 py-2 hidden md:table-cell">
                    {item.portfolio_url}
                  </td>
                  <td className="border-b px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 p-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 p-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;