import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function CsvDataComponent() {
  const [dataPoints, setDataPoints] = useState([]);
  const fileName = localStorage.getItem('selectedFile')

  useEffect(() => {
    const fetchDataPoints = async () => {
      const response = await fetch(`/csv/${fileName}.csv`);
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true, // Automatically converts numeric strings to numbers
        complete: (results) => {
          console.log('Parsed results:', results.data);
          const timeValuePairs = results.data.map(row => ({
            time: row.time,
            value: row.value
          }));
          setDataPoints(timeValuePairs);
        }
      });
    };

    fetchDataPoints();
  }, [fileName]);

  // Now, dataPoints const contains all your time and value pairs
  // You can render them or use them as needed
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
