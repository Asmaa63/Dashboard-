import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Home.css';
import { Chart } from 'chart.js/auto';
import OptionImage from '../OptionImage/OptionImage';

const Home = () => {
  const [userCounts, setUserCounts] = useState({
    User: 0,
    'Agricultural engineer': 0,
    Botanist: 0,
    Expert: 0,
    Admin: 0,
  });

  const totalQueriesChartRef = useRef(null);
  const userEngagementsChartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;

        const response = await axios.get('http://plantify.runasp.net/api/Dashboard/get-user-counts-by-role', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          setUserCounts(response.data);
        } else {
          console.error('Error fetching user counts:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user counts:', error);
      }
    };

    const fetchUserCountsOverTime = async (period) => {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const response = await axios.get(`http://plantify.runasp.net/api/Dashboard/user-counts-over-time?period=${period}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          return response.data;
        } else {
          console.error(`Error fetching user counts over time for ${period}:`, response.status);
          return {};
        }
      } catch (error) {
        console.error(`Error fetching user counts over time for ${period}:`, error);
        return {};
      }
    };

    const fetchUserEngagementsOverTime = async (period) => {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const response = await axios.get(`http://plantify.runasp.net/api/Dashboard/user-engagements-over-time?period=${period}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          return response.data;
        } else {
          console.error(`Error fetching user engagements over time for ${period}:`, response.status);
          return {};
        }
      } catch (error) {
        console.error(`Error fetching user engagements over time for ${period}:`, error);
        return {};
      }
    };

    const loadAllData = async () => {
      await fetchData();

      const dailyData = await fetchUserCountsOverTime('daily');
      const monthlyData = await fetchUserCountsOverTime('monthly');
      const yearlyData = await fetchUserCountsOverTime('yearly');
      const dailyEngagementData = await fetchUserEngagementsOverTime('daily');
      const monthlyEngagementData = await fetchUserEngagementsOverTime('monthly');
      const yearlyEngagementData = await fetchUserEngagementsOverTime('yearly');

      const dailyLabels = Object.keys(dailyData);
      const dailyValues = Object.values(dailyData);

      const monthlyLabels = Object.keys(monthlyData);
      const monthlyValues = Object.values(monthlyData);

      const yearlyLabels = Object.keys(yearlyData);
      const yearlyValues = Object.values(yearlyData);

      const dailyEngagementLabels = Object.keys(dailyEngagementData);
      const dailyEngagementValues = Object.values(dailyEngagementData);

      const monthlyEngagementLabels = Object.keys(monthlyEngagementData);
      const monthlyEngagementValues = Object.values(monthlyEngagementData);

      const yearlyEngagementLabels = Object.keys(yearlyEngagementData);
      const yearlyEngagementValues = Object.values(yearlyEngagementData);

      const ctx = totalQueriesChartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dailyLabels,
          datasets: [
            {
              label: 'Daily Users',
              data: dailyValues,
              backgroundColor: 'rgba(0, 123, 255, 0.2)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1
            },
            {
              label: 'Monthly Users',
              data: monthlyValues,
              backgroundColor: 'rgba(40, 167, 69, 0.2)',
              borderColor: 'rgba(40, 167, 69, 1)',
              borderWidth: 1
            },
            {
              label: 'Yearly Users',
              data: yearlyValues,
              backgroundColor: 'rgba(255, 193, 7, 0.2)',
              borderColor: 'rgba(255, 193, 7, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      const ctxEngagement = userEngagementsChartRef.current.getContext('2d');
      new Chart(ctxEngagement, {
        type: 'line',
        data: {
          labels: dailyEngagementLabels,
          datasets: [
            {
              label: 'Daily Engagements',
              data: dailyEngagementValues,
              backgroundColor: 'rgba(220, 53, 69, 0.2)',
              borderColor: 'rgba(220, 53, 69, 1)',
              borderWidth: 1
            },
            {
              label: 'Monthly Engagements',
              data: monthlyEngagementValues,
              backgroundColor: 'rgba(255, 193, 7, 0.2)',
              borderColor: 'rgba(255, 193, 7, 1)',
              borderWidth: 1
            },
            {
              label: 'Yearly Engagements',
              data: yearlyEngagementValues,
              backgroundColor: 'rgba(40, 167, 69, 0.2)',
              borderColor: 'rgba(40, 167, 69, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };

    loadAllData();
  }, []);

  return (
    <div className="home-cont">
      <div className="home">
        <div className="header">
          <div>
            <h2>Number of Normal Users</h2>
            <p>{userCounts.User}</p>
          </div>
          <div>
            <h2>Number of Agronomists</h2>
            <p>{userCounts['Agricultural engineer']}</p>
          </div>
          <div>
            <h2>Number of Botanists</h2>
            <p>{userCounts.Botanist}</p>
          </div>
          <div>
            <h2>Number of Experts</h2>
            <p>{userCounts.Expert}</p>
          </div>
          <div>
            <h2>Number of Admins</h2>
            <p>{userCounts.Admin}</p>
          </div>
        </div>

        <div className="charts">
          <div className="chart-group">
            <div className="chart">
              <h3>Number of Users Over Time</h3>
              <canvas ref={totalQueriesChartRef}></canvas>
            </div>
            <div className="chart">
              <h3>Number of User Engagements</h3>
              <canvas ref={userEngagementsChartRef}></canvas>
            </div>
          </div>
        </div>
        <OptionImage></OptionImage>
      </div>
    </div>
  );
}

export default Home;
