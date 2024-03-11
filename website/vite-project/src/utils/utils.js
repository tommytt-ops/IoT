import Papa from 'papaparse';

export function fetchAndCalculateAverages (fileNames, setAveragesCallback) {
    fileNames.forEach((fileName) => {
        fetch(`/csv/${fileName}`) 
          .then(response => response.text())
          .then(text => {
            const rows = text.split('\n');
            const columnValues = rows.map(row => {
              const columns = row.split(',');
              return parseFloat(columns[2]);
            }).filter(value => !isNaN(value));
  
            const sum = columnValues.reduce((acc, curr) => acc + curr, 0);
            const avg = sum / columnValues.length;
  
            setAveragesCallback(prevAverages => ({
              ...prevAverages,
              [fileName.replace('.csv', '')]: avg
            }));
          });
      });
};

export async function fetchDataPoints (fileName, setDataPoints)  {
  try {
    const response = await fetch(`/csv/${fileName}.csv`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const csvText = await response.text();

    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        console.log('Parsed results:', results.data);
        const filteredResults = results.data.filter(row => row.time !== undefined && row.value !== undefined);
        const timeValuePairs = filteredResults.map(row => ({
          time: row.time,
          value: row.value
        }));
        setDataPoints(timeValuePairs);
      }
    });
  } catch (error) {
    console.error('Error in fetchDataPoints:', error);
  }
};




  



  