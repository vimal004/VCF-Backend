import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="space-y-6 w-full max-w-md text-center">
        <Link to="allcustomers" className="block mb-4">
          <button className="w-full px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700">
            View Customers Details
          </button>
        </Link>
        <Link to="managecustomers" className="block mb-4">
          <button className="w-full px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700">
            Manage Customer Records
          </button>
        </Link>
        <Link to="managegroups" className="block mb-4">
          <button className="w-full px-6 py-3 bg-purple-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-700">
            Manage Groups
          </button>
        </Link>
        <Link to="viewgroups" className="block mb-4">
          <button className="w-full px-6 py-3 bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-700">
            View Groups
          </button>
        </Link>
        <Link to="defaulters" className="block mb-4">
          <button className="w-full px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700">
            View Defaulters By Group
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
