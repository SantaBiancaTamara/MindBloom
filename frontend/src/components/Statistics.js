import React, { useEffect, useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Statistics = () => {
  const token = localStorage.getItem('token');
  const [weekData, setWeekData] = useState({});
  const [monthData, setMonthData] = useState({});
  const [moodCountData, setMoodCountData] = useState({});
  const [topActivitiesData, setTopActivitiesData] = useState({});

  useEffect(() => {
    const fetchWeekData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getMoodFluctuationsOverWeek', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const moodsOverWeek = response.data;
        const data = {
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          datasets: Object.keys(moodsOverWeek).map(day => ({
            label: `Day ${day}`,
            data: moodsOverWeek[day].map(mood => mood),
            fill: false,
            borderColor: 'rgba(75,192,192,1)'
          }))
        };
        setWeekData(data);
      } catch (error) {
        console.error('Error fetching week data:', error);
      }
    };

    const fetchMonthData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getMoodFluctuationsOverMonth', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const moodsOverMonth = response.data;
        const data = {
          labels: Array.from({ length: 31 }, (_, i) => i + 1),
          datasets: Object.keys(moodsOverMonth).map(day => ({
            label: `Day ${day}`,
            data: moodsOverMonth[day].map(mood => mood),
            fill: false,
            borderColor: 'rgba(153,102,255,1)'
          }))
        };
        setMonthData(data);
      } catch (error) {
        console.error('Error fetching month data:', error);
      }
    };

    const fetchMoodCountData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getMoodCount', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const moodCounts = response.data;
        const data = {
          labels: moodCounts.map(mood => mood.moodName),
          datasets: [{
            data: moodCounts.map(mood => mood.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
          }]
        };
        setMoodCountData(data);
      } catch (error) {
        console.error('Error fetching mood count data:', error);
      }
    };

    const fetchTopActivitiesData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getTopActivities', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const topActivities = response.data;
        const data = {
          labels: topActivities.map(activity => activity.activityName),
          datasets: [{
            data: topActivities.map(activity => activity.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
          }]
        };
        setTopActivitiesData(data);
      } catch (error) {
        console.error('Error fetching top activities data:', error);
      }
    };

    fetchWeekData();
    fetchMonthData();
    fetchMoodCountData();
    fetchTopActivitiesData();
  }, [token]);

  return (
    <div>
      <h1>Statistics Page</h1>
      <div>
        <h2>Mood Fluctuations Over the Week</h2>
        {weekData.labels ? <Line data={weekData} /> : <p>Loading...</p>}
      </div>
      <div>
        <h2>Mood Fluctuations Over the Month</h2>
        {monthData.labels ? <Line data={monthData} /> : <p>Loading...</p>}
      </div>
      <div>
        <h2>Mood Count</h2>
        {moodCountData.labels ? <Pie data={moodCountData} /> : <p>Loading...</p>}
      </div>
      <div>
        <h2>Top 5 Activities</h2>
        {topActivitiesData.labels ? <Bar data={topActivitiesData} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Statistics;
