// Activities.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Activities() {
  const [categories, setCategories] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState(new Set());
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories with their associated activities
    const fetchCategoriesWithActivities = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to continue.');
        return;
      }

      try {
        // Assume your backend endpoint for fetching categories with activities is '/getCategorywithActivities'
        const response = await axios.get('http://localhost:8080/getCategorywithActivities', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(response.data);
      } catch (error) {
        setError(error.response?.data.message || 'Failed to fetch activities.');
      }
    };

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
    console.log(entryId);
    const token = localStorage.getItem('token');
    console.log(token);
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

      // Clear the entryId from localStorage and navigate to the confirmation or summary page
      //console.log(response.data);
    //  localStorage.removeItem('entryId');
    navigate('/entries')
    } catch (error) {
      setError(error.response?.data.message || 'Failed to complete entry.');
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
            <div className="activities">
              {category.activities.map((activity) => (
                <div key={activity._id} className="activity">
                  <input
                    type="checkbox" // Use checkbox for multiple selections
                    id={`activity-${activity._id}`}
                    name="activity"
                    value={activity._id}
                    checked={selectedActivities.has(activity._id)}
                    onChange={() => handleActivitySelection(activity._id)}
                  />
                  <label htmlFor={`activity-${activity._id}`}>
                    <span role="img" aria-label={activity.name}>{activity.emoji}</span>
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
