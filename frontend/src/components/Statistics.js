import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import NavBar from './NavBar'; // Ensure this path is correct
import '../styles/Statistics.css';


ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const [moodData, setMoodData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [showMonthlyInputs, setShowMonthlyInputs] = useState(false); // To show or hide month/year inputs
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Current year

  useEffect(() => {
    if (showMonthlyInputs) {
      fetchDataByMonth();
    } else {
      fetchOverallData();
    }
  }, [showMonthlyInputs, selectedMonth, selectedYear]);

  const fetchOverallData = () => {
    fetchOverallMoodData();
    fetchOverallActivityData();
  };

  const fetchDataByMonth = () => {
    fetchMoodDataByMonth();
    fetchActivityDataByMonth();
  };

  const fetchOverallMoodData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getMoodCount', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Overall Mood data:', response.data);
      setMoodData(response.data);
    } catch (error) {
      console.error('Error fetching overall mood data:', error);
    }
  };

  const fetchMoodDataByMonth = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getMonthlyMoodCount', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          month: selectedMonth,
          year: selectedYear
        }
      });
      console.log('Monthly Mood data:', response.data);
      setMoodData(response.data);
    } catch (error) {
      console.error('Error fetching monthly mood data:', error);
    }
  };

  const fetchOverallActivityData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getActivityCount', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Overall Activity data:', response.data);
      setActivityData(response.data);
    } catch (error) {
      console.error('Error fetching overall activity data:', error);
    }
  };

  const fetchActivityDataByMonth = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getMonthlyActivityCount', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          month: selectedMonth,
          year: selectedYear
        }
      });
      console.log('Monthly Activity data:', response.data);
      setActivityData(response.data);
    } catch (error) {
      console.error('Error fetching monthly activity data:', error);
    }
  };

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

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  return (
    <NavBar>
      <div className="statistics-page">
        <h1>Statistics</h1>
        <div className="filter-container">
          <button className="filter-button" onClick={() => setShowMonthlyInputs(false)}>Overall</button>
          <button className="filter-button" onClick={() => setShowMonthlyInputs(true)}>Monthly</button>
          {showMonthlyInputs && (
            <div className="date-picker">
              <h3>Select Month</h3>
              <input type="number" value={selectedMonth} onChange={handleMonthChange} min="1" max="12" />
              <h3>Select Year</h3>
              <input type="number" value={selectedYear} onChange={handleYearChange} min="2000" max="2100" />
            </div>
          )}
        </div>
        <div className="content-container">
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
      </div>
    </NavBar>
  );
};


export default Statistics;
