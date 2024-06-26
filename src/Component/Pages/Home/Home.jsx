// src/Pages/Home/Home.jsx
import React, { useEffect } from 'react';
import './Home.css';
import { Chart } from 'chart.js/auto';

const Home = () => {
  useEffect(() => {
    // Total Queries Chart
    const ctx1 = document.getElementById('totalQueriesChart').getContext('2d');
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: Array.from({ length: 24 }, (_, i) => i + ":00"),
        datasets: [{
          label: 'Total Queries',
          data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 150)),
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderColor: 'rgba(0, 123, 255, 1)',
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

    // Client Activity Chart
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

    // Query Types Chart
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

    // Upstream Servers Chart
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
          <h2>Total Queries</h2>
          <p>947</p>
        </div>
        <div>
          <h2>Queries Blocked</h2>
          <p>56</p>
        </div>
        <div>
          <h2>Percentage Blocked</h2>
          <p>5.9%</p>
        </div>
        <div>
          <h2>Domains on Adlists</h2>
          <p>132,662</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-group">
          <div className="chart">
            <h3>Total queries over last 24 hours</h3>
            <canvas id="totalQueriesChart"></canvas>
          </div>
          <div className="chart full-width">
            <h3>Query Types</h3>
            <canvas id="queryTypesChart"></canvas>
          </div>
          {/* <div className="chart">
            <h3>Client activity over last 24 hours</h3>
            <canvas id="clientActivityChart"></canvas>
          </div> */}
        </div>
        <div className="chart-group2">
          {/* <div className="chart full-width">
            <h3>Query Types</h3>
            <canvas id="queryTypesChart"></canvas>
          </div> */}
          <div className="chart">
            <h3>Client activity over last 24 hours</h3>
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
