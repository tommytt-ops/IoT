import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/App.css";
import {fetchAndCalculateAverages} from "../utils/utils"

function CsvFileAverages() {
  const [averages, setAverages] = useState({});
  const fileNames = ['film1.csv', 'film2.csv']; 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchAndCalculateAverages(fileNames, setAverages);
  }, []);

  const handleFileClick = (fileName) => {
    localStorage.setItem('selectedFile', fileName);
    navigate('/movie'); 
  };

  return (
    <div className='title'>
      <h2>Movies</h2>
      <div className="average-list">
        {Object.entries(averages).map(([fileName, avg]) => (
          <p key={fileName} onClick={() => handleFileClick(fileName)}>
            {fileName}: {`Average: ${avg.toFixed(2)}`}
          </p>
        ))}
      </div>
    </div>
  );
}

export default CsvFileAverages;
