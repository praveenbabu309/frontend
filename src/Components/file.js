import React from 'react';
import fileDownload from 'js-file-download'

function File() {
  const downloadCsv = () => {
    // const csvData = "Id, Name\r\n63, uig\r\n65, iugj\r\n616, 61\r\n646, 29\r\n";
    // const blob = new Blob([csvData], { type: 'text/csv' });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = 'file.csv';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(url);
    fileDownload("Id, Name\r\n63, uig\r\n65, iugj\r\n616, 61\r\n646, 29\r\n", "file.csv")
  };

  return (
    <div>
      <button onClick={downloadCsv}>Download CSV</button>
    </div>
  );
}

export default File;
