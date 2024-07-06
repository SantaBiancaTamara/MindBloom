import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import NavBar from './NavBar'; // Ensure this path is correct
import '../styles/Statistics.css';

// Register the elements, scales, and controllers with ChartJS
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Statistics = () => {
  const [moodData, setMoodData] = useState([]);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/getMoodCount', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMoodData(data))
      .catch(error => console.error('Error fetching mood data:', error));

    fetch('http://localhost:8080/getActivityCount', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setActivityData(data))
      .catch(error => console.error('Error fetching activity data:', error));
  }, []);

  const moodColorMapping = {
    "Very Good": "green",
    "Good": "lightgreen",
    "Meh": "yellow",
    "Bad": "orange",
    "Awful": "red"
  };

  const moodChartData = {
    labels: moodData.map(item => item.moodName),
    datasets: [{
      data: moodData.map(item => item.count),
      backgroundColor: moodData.map(item => moodColorMapping[item.moodName] || '#FF9F40') 
    }]
  };

  return (
    <NavBar>
      <div className="statistics-page">
        <h1>Statistics</h1>
        <div className="chart-container">
          <h2>Mood Count</h2>
          <Pie data={moodChartData} />
        </div>
        <div className="table-container">
          <h2>Activity Count</h2>
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Category</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {activityData.map((item, index) => (
                <tr key={index}>
                  <td>{item.activityName}</td>
                  <td>{item.categoryName}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </NavBar>
  );
};

export default Statistics;
