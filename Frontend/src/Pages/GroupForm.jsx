import React, { useState } from "react";
import axios from "axios";

const GroupForm = () => {
  const [formData, setFormData] = useState({
    group: "",
    groupname: "",
    months: "",
    startmonth: "",
  });

  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleDelete = () => {
    axios
      .delete(`https://vcf-backend.vercel.app/group`, {
        data: formData, // Specify data object to send in the request body
      })
      .then((res) => {
        console.log(res);
        setDeleted(true);
        setTimeout(() => {
          setDeleted(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error deleting group:", err);
        // Handle error state or display an error message
      });
  };

  const handleUpdate = () => {
    axios
      .put(`https://vcf-backend.vercel.app/group`, formData)
      .then((res) => {
        console.log(res);
        setUpdated(true);
        setTimeout(() => {
          setUpdated(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error updating group:", err);
        // Handle error state or display an error message
      });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://vcf-backend.vercel.app/group", formData)
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
        setCreated(true);
        setTimeout(() => {
          setCreated(false);
          setSuccess(null);
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
      });
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Group Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Group Number:</label>
          <input
            name="group"
            type="text"
            value={formData.group}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Group Name:</label>
          <input
            name="groupname"
            type="text"
            value={formData.groupname}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Months:</label>
          <input
            name="months"
            type="number"
            value={formData.months}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Starting Month:</label>
          <input
            name="startmonth"
            type="text"
            value={formData.startmonth}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>
        {created && success === true ? (
          <div className="text-green-500 text-center my-5">Group Created</div>
        ) : success === false ? (
          <div className="text-red-500 text-center my-5">
            Group Creation Failed
          </div>
        ) : (
          <div></div>
        )}
        {deleted ? (
          <div className="text-green-500 text-center my-5">
            Group Record Deleted
          </div>
        ) : (
          <div></div>
        )}
        {updated ? (
          <div className="text-green-500 text-center my-5">
            Group Record Updated
          </div>
        ) : (
          <div></div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
        >
          Create
        </button>
        <button
          type="button"
          onClick={handleUpdate}
          className="w-full bg-yellow-500 text-white py-2 rounded-lg font-medium hover:bg-yellow-600 transition duration-300 mt-4"
        >
          Update
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition duration-300 mt-4"
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default GroupForm;
