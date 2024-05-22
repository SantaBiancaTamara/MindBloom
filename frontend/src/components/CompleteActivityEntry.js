import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Activities() {
  const [categories, setCategories] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState(new Set());
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCategoriesWithActivities = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to continue.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/getAllActivitiesForUser', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Fetched Categories with Activities:", response.data); // Debugging log
      setCategories(response.data);
    } catch (error) {
      setError(error.response?.data.message || 'Failed to fetch activities.');
    }
  };

  useEffect(() => {
    fetchCategoriesWithActivities();
  }, []);

  const handleActivitySelection = (activityId) => {
    setSelectedActivities((prevSelectedActivities) => {
      const updatedSelectedActivities = new Set(prevSelectedActivities);
      if (updatedSelectedActivities.has(activityId)) {
        updatedSelectedActivities.delete(activityId);
      } else {
        updatedSelectedActivities.add(activityId);
      }
      return updatedSelectedActivities;
    });
  };

  const completeEntry = async () => {
    const entryId = localStorage.getItem('entryId');
    const token = localStorage.getItem('token');
    if (!entryId || !token) {
      setError('No entry found to update.');
      return;
    }

    try {
      await axios.patch(`http://localhost:8080/insertCompleteEntry/${entryId}`, {
        activityIds: Array.from(selectedActivities)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/entries');
    } catch (error) {
      setError(error.response?.data.message || 'Failed to complete entry.');
    }
  };

  const handleAddActivity = async (categoryName) => {
    const newActivityName = prompt("Enter the name for the new activity:");
    if (!newActivityName) return;
  
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8080/addUserActivity', {
        categoryName,  // Send category name instead of ID
        name: newActivityName,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategoriesWithActivities(); // Refresh categories to show the new activity
    } catch (error) {
      setError("Failed to add activity.");
    }
  };

  return (
    <div className="activity-tracker">
      <h2>What did you do?</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="categories">
        {categories.map((category) => (
          <div key={category._id} className="category">
            <h3>{category.name}</h3>
            <button onClick={() => handleAddActivity(category._id)}>+ Add Activity</button>
            <div className="activities">
              {category.activities.map((activity) => (
                <div key={activity._id} className="activity">
                  <input
                    type="checkbox"
                    id={`activity-${activity._id}`}
                    name="activity"
                    value={activity._id}
                    checked={selectedActivities.has(activity._id)}
                    onChange={() => handleActivitySelection(activity._id)}
                  />
                  <label htmlFor={`activity-${activity._id}`}>
                    {activity.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="save-button" onClick={completeEntry}>Save</button>
    </div>
  );
}

export default Activities;
