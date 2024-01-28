import Papa from 'papaparse';

const generateCSVContent = (iterations) => {
  if (!Array.isArray(iterations)) {
    console.error('Invalid iterations data:', iterations);
    return ''; 
  }

  const csvData = [
    ['Iteration', 'Number of Requests', 'Processing Time (ms)'],
    ...iterations.map((iteration) => [
      iteration.iteration,
      iteration.requests,
      iteration.totalProcessingTime,
    ]),
  ];

  // Use Papa.unparse with comma as the delimiter
  return Papa.unparse(csvData, {
    delimiter: ',', 
  });
};

export default generateCSVContent;
