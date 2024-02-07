import React, { useState, useEffect } from 'react';
import "./css/App.css";

function CsvFileAverages() {
  const [averages, setAverages] = useState({});
  const fileNames = ['file1.csv', 'file2.csv', 'file3.csv']; 

  useEffect(() => {
    fileNames.forEach((fileName) => {
      fetch(`./csv/${fileName}`) 
        .then(response => response.text())
        .then(text => {
          const rows = text.split('\n'); 
          const columnValues = rows.map(row => {
            const columns = row.split(',');
            return parseFloat(columns[1]); 
          }).filter(value => !isNaN(value)); 

          const sum = columnValues.reduce((acc, curr) => acc + curr, 0);
          const avg = sum / columnValues.length;

          setAverages(prevAverages => ({
            ...prevAverages,
            [fileName.replace('.csv', '')]: avg 
          }));
        });
    });
  }, []); 

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
