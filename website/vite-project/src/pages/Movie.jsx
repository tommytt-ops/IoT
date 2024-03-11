
import React, { useState, useEffect } from 'react';
import {fetchDataPoints} from '../utils/utils'; 

function CsvDataComponent() {
  const [dataPoints, setDataPoints] = useState([]);
  const fileName = localStorage.getItem('selectedFile');

  useEffect(() => {
    if (fileName) {
      fetchDataPoints(fileName, setDataPoints);
    }
  }, [fileName]);

  return (
    <div>
      <h2>Data Points</h2>
      <ul>
        {dataPoints.map((point, index) => (
          <li key={index}>{`Time: ${point.time}, Value: ${point.value}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default CsvDataComponent;
