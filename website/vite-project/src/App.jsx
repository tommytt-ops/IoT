import React, { useState, useEffect } from 'react';
import "./css/App.css";

function CsvFileAverages() {
  const [averages, setAverages] = useState({});
  const fileNames = ['file1.csv']; // Example file names

  useEffect(() => {
    fileNames.forEach((fileName) => {
      fetch(`./public/csv/${fileName}`)
        .then(response => response.text())
        .then(text => {
          const rows = text.split('\n').slice(1); // Assuming the first row is a header and skipping it
          const columnValues = rows.map(row => {
            const columns = row.split(',');
            return parseFloat(columns[1]); // Assuming the second column contains the numbers
          }).filter(value => !isNaN(value)); // Filter out non-numeric values

          const sum = columnValues.reduce((acc, curr) => acc + curr, 0);
          const avg = sum / columnValues.length;

          // Update state with the average for this file
          setAverages(prevAverages => ({
            ...prevAverages,
            [fileName.replace('.csv', '')]: avg // Remove ".csv" from the file name
          }));
        });
    });
  }, []); // Dependency array is empty, meaning this effect runs once after the initial render

  return (
    <div className='title'>
      <h2>Movies</h2>
      {Object.entries(averages).map(([fileName, avg]) => (
        <p key={fileName}>{fileName}: {avg !== null ? `Average: ${avg.toFixed(2)}` : 'Calculating...'}</p>
      ))}
    </div>
  );
}

export default CsvFileAverages;
