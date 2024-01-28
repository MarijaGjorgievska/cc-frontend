

import axios from 'axios';

const sendRequest = async (file, endpoint, iteration, count, iterationCallback) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(`Iteration ${iteration}, Request ${count + 1} sent:`, response.data);

    // Callback to update UI with current iteration information
    iterationCallback({
      iteration: iteration,
      numberOfRequests: count + 1,
      processingTime: response.data.processingTime,
    });
    return response.data; 
  } catch (error) {
    console.error('Error sending request:', error);
    throw error; 
  }
};

export default sendRequest;
