import React from "react";

const ActivityTable = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Logged Activities
      </h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Activity</th>
            <th className="p-2 border">Duration (minutes)</th>
            <th className="p-2 border">Calories Burnt</th>
            <th className="p-2 border">Steps</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2 border capitalize">{activity.activity}</td>
              <td className="p-2 border">{activity.duration * 60} minutes</td>
              <td className="p-2 border">{activity.calories} Cal</td>
              <td className="p-2 border">{activity.steps || 0}</td>
            </tr>
          ))}
          {activities.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-2 border">
                No activities logged yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
