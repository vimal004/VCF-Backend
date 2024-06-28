import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    group: "",
  });

  useEffect(() => {
    axios
      .get("https://vcf-app-backend.vercel.app/customers")
      .then((response) => {
        setCustomers(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredCustomers = customers.filter((customer) => {
    return (
      (filter.group === "" || customer.group === parseInt(filter.group, 10)) &&
      (filter.name === "" ||
        customer.name.toLowerCase().includes(filter.name.toLowerCase()))
    );
  });

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">Customer Details</h1>
      <div className="flex justify-between items-center mb-4">
        <label className="mr-4">
          Filter By Group:
          <input
            name="group"
            value={filter.group}
            type="number"
            placeholder="Enter Group Number"
            onChange={handleFilterChange}
            className="ml-2 border border-gray-300 px-2 py-1 text-black rounded"
          />
        </label>
        <label>
          Search Customer By Name:
          <input
            name="name"
            type="text"
            value={filter.name}
            placeholder="Enter Customer Name"
            onChange={handleFilterChange}
            className="ml-2 border border-gray-300 px-2 py-1 rounded text-black"
          />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">
                Customer Name
              </th>
              <th className="border border-gray-200 px-4 py-2">Phone Number</th>
              <th className="border border-gray-200 px-4 py-2">Address</th>
              <th className="border border-gray-200 px-4 py-2">Group Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border border-gray-200">
                  <td className="border border-gray-200 px-4 py-2">
                    <Link to={`/customers/${customer.id}`}>{customer.id}</Link>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {customer.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {customer.phno}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {customer.address}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {customer.group}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-200 px-4 py-2">
                  <div className="text-center text-red-500">
                    No Customer Record Found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCustomers;
