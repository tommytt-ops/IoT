import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchDataPoints } from '../utils/utils';
import "../css/Graph.css";
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function CsvDataComponent() {
  const [dataPoints, setDataPoints] = useState([]);
  const selectedMovie = localStorage.getItem("selectedFile"); 
  const fileName = `/csv/${selectedMovie}.csv`;


  useEffect(() => {
    // Check if fileName is truthy to avoid unnecessary fetch calls
    if (fileName) {
      fetchDataPoints(fileName)
        .then(points => {
          setDataPoints(points); // Update state with the fetched data points
        })
        .catch(error => console.error("Error fetching data points:", error));
    }
  }, [fileName]); // Depend on fileName to refetch when it changes

  const data = {
    labels: dataPoints.map(point => point.time),
    datasets: [{
      label: selectedMovie ? selectedMovie.replace('.csv', '') : '', // Use file name as label, removing '.csv'
      data: dataPoints.map(point => point.value),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 25
          }
        }
      },
      tooltip: {
        bodyFont: {
          size: 25
        }
      }
    }
  };

  return (
    <div className="graph-container">
      <div className="graph">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default CsvDataComponent;
