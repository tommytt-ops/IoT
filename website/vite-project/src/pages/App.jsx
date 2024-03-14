import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/App.css";
import { fetchAndCalculateAverages } from "../utils/utils";

function CsvFileAverages() {
  const [averages, setAverages] = useState({});
  const fileNames = ["./csv/film1.csv", "./csv/film2.csv"]; 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchAndCalculateAverages(fileNames)
      .then(calculatedAverages => {
        setAverages(calculatedAverages); 
      })
      .catch(error => {
        console.error("Failed to fetch and calculate averages:", error);
      
      });
  }, []);

  const handleFileClick = (fileName) => {
    localStorage.setItem('selectedFile', fileName);
    navigate('/movie'); 
  };

  return (
    <div className='title'>
      <h2>Movies 2</h2>
      <div className="average-list">
        {Object.entries(averages).map(([fileName, avg]) => (
          <p key={fileName} onClick={() => handleFileClick(fileName.replace('.csv', ''))}>
            {fileName.replace('.csv', '')}: {`Average: ${avg.toFixed(2)}`}
          </p>
        ))}
      </div>
    </div>
  );
}

export default CsvFileAverages;
