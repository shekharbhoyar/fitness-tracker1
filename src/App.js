import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import LogActivityScreen from "./pages/LogActivityScreen";

const App = () => {
  const [activities, setActivities] = useState([]);

  // Load activities from local storage when the app loads
  useEffect(() => {
    const storedActivities = JSON.parse(localStorage.getItem("activities")) || [];
    setActivities(storedActivities);
  }, []);

  // Function to add a new activity
  const handleAddActivity = (newActivity) => {
    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<HomeScreen activities={activities} />}
        />
        <Route
          path="/log-activity"
          element={<LogActivityScreen onAddActivity={handleAddActivity} />}
        />
      </Routes>
    </div>
  );
};

export default App;
