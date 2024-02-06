import React, { useState, useEffect } from 'react';
import "./css/App.css";

function CsvFileAverages() {
  const [averages, setAverages] = useState({});
  const fileNames = ['file1.csv', 'file2.csv', 'file3.csv']; // Example file names

  useEffect(() => {
    fileNames.forEach((fileName) => {
      fetch(`./csv/${fileName}`) // Adjusted the path to be relative to the public directory
        .then(response => response.text())
        .then(text => {
          const rows = text.split('\n').slice(1); // Skipping the header row
          const columnValues = rows.map(row => {
            const columns = row.split(',');
            return parseFloat(columns[1]); // Assumes the second column contains the numbers
          }).filter(value => !isNaN(value)); // Filters out non-numeric values

          const sum = columnValues.reduce((acc, curr) => acc + curr, 0);
          const avg = sum / columnValues.length;

          setAverages(prevAverages => ({
            ...prevAverages,
            [fileName.replace('.csv', '')]: avg // Removes ".csv" from the file name
          }));
        });
    });
  }, []); // The empty dependency array means this effect runs once after the initial render

  return (
    <div className='title'>
      <h2>Movies</h2>
      <div className="average-list">
        {Object.entries(averages).map(([fileName, avg]) => (
          <p key={fileName}>{fileName}: {avg !== null ? `Average: ${avg.toFixed(2)}` : 'Calculating...'}</p>
        ))}
      </div>
    </div>
  );
}

export default CsvFileAverages;
