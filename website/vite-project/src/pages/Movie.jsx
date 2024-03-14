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
  const fileName = `./csv/${selectedMovie}.csv`;


  useEffect(() => {
    
    if (fileName) {
      fetchDataPoints(fileName)
        .then(points => {
          setDataPoints(points); 
        })
        .catch(error => console.error("Error fetching data points:", error));
    }
  }, [fileName]); 

  const data = {
    labels: dataPoints.map(point => point.time),
    datasets: [{
      label: selectedMovie, 
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
