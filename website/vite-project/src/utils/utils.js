import Papa from 'papaparse';

export async function fetchAndCalculateAverages(filePaths) {
  const fetchPromises = filePaths.map(filePath => {
    return fetch(filePath) 
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        const rows = text.split('\n');
        const columnValues = rows.map(row => {
          const columns = row.split(',');
          return parseFloat(columns[2]);
        }).filter(value => !isNaN(value));

        const sum = columnValues.reduce((acc, curr) => acc + curr, 0);
        const avg = sum / columnValues.length;

      
        const keyName = filePath.split('/').pop().replace('.csv', '');
        console.log(avg)
        return { [keyName]: avg };
      });
  });

  return Promise.all(fetchPromises)
    .then(results => {
      return results.reduce((acc, result) => ({
        ...acc,
        ...result
      }), {});
    })
    .catch(error => {
      console.error('Error in fetchAndCalculateAverages:', error);
      throw error; 
    });
}

export async function fetchDataPoints(filepath) {
  try {
    const response = await fetch(filepath);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
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
          resolve(timeValuePairs);
        },
        error: (error) => reject(error.message)
      });
    });
  } catch (error) {
    console.error('Error in fetchDataPoints:', error);
    throw error; 
  }
}




  



  