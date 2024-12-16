import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import metValues from "../data/metValues.json"; // Import MET values

const LogActivityScreen = ({ onAddActivity }) => {
  const [activityName, setActivityName] = useState("");
  const [duration, setDuration] = useState("");
  const [weight, setWeight] = useState(70); // Default weight (Kg)
  const [calories, setCalories] = useState(0);
  const [steps, setSteps] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find MET value for the selected activity
    const activityData = metValues.find((item) => item.activity === activityName);

    if (!activityData) {
      alert("Please select a valid activity from suggestions!");
      return;
    }

    // Calculate calories burnt using MET value
    const caloriesBurnt = ((activityData.MET * weight * duration) / 60).toFixed(2);

    // Create a new activity object
    const newActivity = {
      activity: activityName,
      duration: duration + " minutes",
      calories: caloriesBurnt,
      steps: steps || 0,
      date: new Date().toISOString().split("T")[0], // Today's date
    };

    onAddActivity(newActivity);

    // Clear form and navigate
    setActivityName("");
    setDuration("");
    setSteps(0);
    navigate("/");
  };

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Log New Activity
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* Activity Name with Suggestions */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Activity Name</label>
          <input
            list="activities" // Connect to the datalist below
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            placeholder="e.g., Running"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <datalist id="activities">
            {metValues.map((item, index) => (
              <option key={index} value={item.activity} />
            ))}
          </datalist>
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 30"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Weight (Kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 70"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Steps */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Steps</label>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="e.g., 5000"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white font-semibold px-6 py-2 rounded hover:bg-green-600 w-full"
        >
          Save Activity
        </button>
      </form>
    </div>
  );
};

export default LogActivityScreen;
