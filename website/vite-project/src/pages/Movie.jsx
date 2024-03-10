import React from 'react';

function FileDetail() {
  const fileName = localStorage.getItem('selectedFile');

  return (
    <div>
      <h1>File Details</h1>
      <p>Selected File: {fileName}</p>
    </div>
  );
}

export default FileDetail;
