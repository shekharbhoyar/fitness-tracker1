import React, { useState, useEffect } from "react";
import CircularProgressBar from "../components/CircularProgressBar";
import ActivityTable from "../components/ActivityTable";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default: today
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [goalWeightProgress, setGoalWeightProgress] = useState(0);

  const navigate = useNavigate();

  // Load activities from localStorage on component mount
  useEffect(() => {
    const storedActivities = JSON.parse(localStorage.getItem("activities")) || [];
    setActivities(storedActivities);
    filterActivitiesByDate(storedActivities, selectedDate);
  }, []);

  // Function to filter activities based on the selected date
  const filterActivitiesByDate = (allActivities, date) => {
    const filtered = allActivities.filter((activity) => activity.date === date);
    setFilteredActivities(filtered);
    calculateTotals(filtered);
  };

  // Function to calculate total steps and calories for filtered activities
  const calculateTotals = (activities) => {
    const totalSteps = activities.reduce((sum, act) => sum + (parseInt(act.steps) || 0), 0);
    const totalCalories = activities.reduce((sum, act) => sum + (parseFloat(act.calories) || 0), 0);
    setSteps(totalSteps);
    setCalories(totalCalories.toFixed(2));
    calculateGoalWeightProgress();
  };

  // Goal weight progress calculation (can be expanded)
  const calculateGoalWeightProgress = () => {
    // Hardcoded values; replace with dynamic if required
    const currentWeight = 70;
    const goalWeight = 60;
    const progress = ((currentWeight - goalWeight) / currentWeight) * 100;
    setGoalWeightProgress(progress > 0 ? progress : 0);
  };

  // Handle date selection change
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    filterActivitiesByDate(activities, newDate);
  };

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-center text-3xl font-bold text-gray-700 mb-6">
        ACT4 FITNESS
      </h1>

      {/* Date Picker */}
      <div className="flex justify-end mb-4">
        <label className="mr-2 text-gray-700 font-medium">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded px-2 py-1"
        />
      </div>

      {/* Progress Bars */}
      <div className="flex justify-center gap-8 mb-8">
        <CircularProgressBar
          value={steps}
          label="Steps"
          strokeColor="#4caf50"
          maxValue={10000}
        />
        <CircularProgressBar
          value={calories}
          label="Calories Burnt"
          strokeColor="#f44336"
          maxValue={2000}
        />
        <CircularProgressBar
          value={goalWeightProgress}
          label="Goal Progress"
          strokeColor="#2196f3"
          maxValue={100}
        />
      </div>

      {/* Activities Table */}
      <ActivityTable activities={filteredActivities} />

      {/* Log Activity Button */}
      <button
        onClick={() => navigate("/log-activity")}
        className="bg-green-500 text-white text-lg font-semibold px-6 py-2 rounded hover:bg-green-600 w-full mt-6"
      >
        Log Activity
      </button>
    </div>
  );
};

export default HomeScreen;
