import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Home.css';
import { Chart } from 'chart.js/auto';

const Home = () => {
  const [userCounts, setUserCounts] = useState({
    User: 0,
    'Agricultural engineer': 0,
    Botanist: 0,
    Expert: 0,
    Admin: 0,
  });

  const totalQueriesChartRef = useRef(null);

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

    const loadAllData = async () => {
      await fetchData();

      const dailyData = await fetchUserCountsOverTime('daily');
      const monthlyData = await fetchUserCountsOverTime('monthly');
      const yearlyData = await fetchUserCountsOverTime('yearly');

      const dailyLabels = Object.keys(dailyData);
      const dailyValues = Object.values(dailyData);

      const monthlyLabels = Object.keys(monthlyData);
      const monthlyValues = Object.values(monthlyData);

      const yearlyLabels = Object.keys(yearlyData);
      const yearlyValues = Object.values(yearlyData);

      const ctx = totalQueriesChartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: [...dailyLabels, ...monthlyLabels, ...yearlyLabels],
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
    };

    loadAllData();

    const ctx2 = document.getElementById('clientActivityChart').getContext('2d');
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: Array.from({ length: 24 }, (_, i) => i + ":00"),
        datasets: [{
          label: 'Client Activity',
          data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 150)),
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
          borderColor: 'rgba(255, 193, 7, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const ctx3 = document.getElementById('queryTypesChart').getContext('2d');
    new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: ['A (IPv4)', 'AAAA (IPv6)', 'SRV', 'PTR', 'HTTPS'],
        datasets: [{
          data: [60, 20, 10, 5, 5],
          backgroundColor: [
            'rgba(0, 123, 255, 0.7)',
            'rgba(40, 167, 69, 0.7)',
            'rgba(255, 193, 7, 0.7)',
            'rgba(220, 53, 69, 0.7)',
            'rgba(108, 117, 125, 0.7)'
          ],
          borderColor: [
            'rgba(0, 123, 255, 1)',
            'rgba(40, 167, 69, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(220, 53, 69, 1)',
            'rgba(108, 117, 125, 1)'
          ],
          borderWidth: 1
        }]
      }
    });

    const ctx4 = document.getElementById('upstreamServersChart').getContext('2d');
    new Chart(ctx4, {
      type: 'doughnut',
      data: {
        labels: ['8.8.8.8', '8.8.4.4', '1.1.1.1', '9.9.9.9', 'Others'],
        datasets: [{
          data: [40, 30, 15, 10, 5],
          backgroundColor: [
            'rgba(0, 123, 255, 0.7)',
            'rgba(40, 167, 69, 0.7)',
            'rgba(255, 193, 7, 0.7)',
            'rgba(220, 53, 69, 0.7)',
            'rgba(108, 117, 125, 0.7)'
          ],
          borderColor: [
            'rgba(0, 123, 255, 1)',
            'rgba(40, 167, 69, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(220, 53, 69, 1)',
            'rgba(108, 117, 125, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
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
            <div className="chart full-width">
              <h3>Query Types</h3>
              <canvas id="queryTypesChart"></canvas>
            </div>
          </div>
          <div className="chart-group2">
            <div className="chart">
              <h3>Client Activity Over Last 24 Hours</h3>
              <canvas id="clientActivityChart"></canvas>
            </div>
            <div className="chart full-width">
              <h3>Upstream Servers</h3>
              <canvas id="upstreamServersChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
