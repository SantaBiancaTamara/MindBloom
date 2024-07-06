import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/Activities.css';

function Activities() {
  const [categories, setCategories] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState(new Set());
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newActivity, setNewActivity] = useState({ name: '', category: '' });
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

  const handleAddActivity = async () => {
    const token = localStorage.getItem('token');
    if (!newActivity.name || !newActivity.category) 
      return;
    console.log('activity-category sent to backend:', { name: newActivity.name, categoryId: newActivity.category }); 
    try {
      await axios.post('http://localhost:8080/addUserActivity', {
        name: newActivity.name,
        categoryId: newActivity.category 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategoriesWithActivities(); 
      setIsFormVisible(false); 
    } catch (error) {
      setError("failed to add activity");
    }
  };
  const handleInputChange = (e) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

  return (
    <NavBar>
      <div className="activity-tracker">
        <h2>What did you do?</h2>
        {error && <p className="text-danger">{error}</p>}
        <div className="categories">
          {categories.map((category) => (
            <div key={category._id} className="category">
              <h3>{category.name}</h3>
              <button onClick={() => { setIsFormVisible(true); setNewActivity({ ...newActivity, category: category._id }); }}>+ Add Activity</button>
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
        {isFormVisible && (
          <div className="overlay">
            <div className="form-container">
              <span className="close-button" onClick={() => setIsFormVisible(false)}>X</span>
              <h3>Add New Activity</h3>
              <input
                type="text"
                name="name"
                value={newActivity.name}
                onChange={handleInputChange}
                placeholder="Activity Name"
              />
              <button className="submit-button" onClick={handleAddActivity}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </NavBar>
  );
}

export default Activities;
