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


  



  