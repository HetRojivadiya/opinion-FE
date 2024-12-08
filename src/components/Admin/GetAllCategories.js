import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://opinion-fe.onrender.com/getAllCategories/seeList');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setLoading(false);
  };

  const handleUpdateCategories = async () => {
    setLoading(true);
    try {
      await axios.post('https://opinion-fe.onrender.com/getAllCategories/');
      fetchCategories();
    } catch (error) {
      console.error("Error updating categories:", error);
    }
    setLoading(false);
  };

  const handleSeeDetails = (key) => {
    // Navigate to the SeeSpecificSport page with the sportKey as a URL parameter
    navigate(`/admin/seeSpecificSport/${key}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
        <button
          onClick={handleUpdateCategories}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Updating..." : "Check Update"}
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Available Categories</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b">Group</th>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b text-gray-700">{category.group}</td>
                      <td className="py-2 px-4 border-b text-gray-700">{category.title}</td>
                      <td className="py-2 px-4 border-b text-gray-700">{category.description}</td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                          onClick={() => handleSeeDetails(category.key)} // Pass sportKey to the handler
                        >
                          See Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-2 px-4 text-center text-gray-500">No categories available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllCategories;
