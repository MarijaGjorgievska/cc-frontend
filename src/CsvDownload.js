
const downloadCSV = (csvContent) => {
  const encodedCsvContent = encodeURIComponent(csvContent);
  const link = document.createElement('a');
  link.href = 'data:text/csv;charset=utf-8,' + encodedCsvContent;
  link.download = 'iteration_details.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadCSV;