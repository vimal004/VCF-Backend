import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://vcf-app-backend.vercel.app/group")
      .then((response) => {
        setGroups(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">Groups</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Group Name</th>
              <th className="border border-gray-200 px-4 py-2">Group</th>
              <th className="border border-gray-200 px-4 py-2">Months</th>
              <th className="border border-gray-200 px-4 py-2">Start Month</th>
            </tr>
          </thead>
          <tbody>
            {groups.length > 0 ? (
              groups.map((group) => (
                <tr key={group._id} className="border border-gray-200">
                  <td className="border border-gray-200 px-4 py-2">
                    {group.groupname}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {group.group}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {group.months}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {group.startmonth}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-200 px-4 py-2">
                  <div className="text-center text-red-500">
                    No Group Record Found
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

export default ViewGroups;
