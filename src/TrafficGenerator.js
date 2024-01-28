
import sendRequest from './sendRequest';
import generateCSVContent from './CsvContent';

const TrafficGenerator = async (file, threshold, selectedEndpoint, iterationCallback, setIterations, setLoading, setCSVContent) => {
  try {
    const maxIterations = Math.ceil(Math.log2(threshold));
    const iterationDetails = [];
    let totalRequests = 0;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      const requestsPerIteration = Math.pow(2, iteration);
      const promises = [];

      const startTime = performance.now();

      for (let i = 0; i < requestsPerIteration; i++) {
        promises.push(sendRequest(file, getEndpoint(selectedEndpoint), iteration, i, iterationCallback));
      }

      await Promise.all(promises);

      const endTime = performance.now();
      const processingTime = Math.round(endTime - startTime); // Round to the nearest integer

      iterationDetails.push({
        iteration: iteration + 1,
        requests: requestsPerIteration,
        totalProcessingTime: processingTime,
      });

      totalRequests += requestsPerIteration;

      if (totalRequests >= threshold) {
        break;
      }
    }

    // Update the iterations in the component state
    setIterations(iterationDetails);

    // Generate CSV content here and update the state
    const newCSVContent = generateCSVContent(iterationDetails);
    setCSVContent(newCSVContent);

    // Set loading to false after the traffic generator has completed
    setLoading(false);

    console.log('Traffic generator stopped. Threshold reached.');
  } catch (error) {
    console.error('Error in traffic generator:', error);
  }
};

const getEndpoint = (selectedEndpoint) => {
  return selectedEndpoint === 'server'
    ? 'http://20.199.43.140:5196/api/pvo/upload'
    : 'https://pvofunction.azurewebsites.net/api/UploadFileHttp';
};


export default TrafficGenerator;
