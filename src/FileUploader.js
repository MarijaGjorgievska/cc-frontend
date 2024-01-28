import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrafficGenerator from './TrafficGenerator';
import 'bootstrap/dist/css/bootstrap.min.css';
import IterationsTable from './IterationsTable';
import ThresholdInput from './ThresholdInput';
import generateCSVContent from './CsvContent';
import downloadCSV from './CsvDownload';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startTraffic, setStartTraffic] = useState(false);
  const [threshold, setThreshold] = useState(100);
  const [csvContent, setCSVContent] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState('server'); // Default selection

  useEffect(() => {
    if (startTraffic) {
      TrafficGenerator(file, threshold, selectedEndpoint, iterationCallback, setIterations, setLoading, setCSVContent);
    }
  }, [startTraffic, file, threshold, selectedEndpoint, setIterations, setLoading, setCSVContent]);

  const handleThresholdChange = (e) => {
    setThreshold(parseInt(e.target.value, 10));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEndpointChange = (e) => {
    setSelectedEndpoint(e.target.value);
  };

  const handleUpload = async () => {
    try {
      const endpoint =
        selectedEndpoint === 'server'
          ? 'http://20.199.43.140:5196/api/pvo/upload'
          : 'https://pvofunction.azurewebsites.net/api/UploadFileHttp';

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newIteration = {
        iteration: iterations.length + 1,
        totalProcessingTime: response.data.processingTime, 
      };

      const newIterations = [...iterations, newIteration];

      // Set CSV content directly from the newIterations
      const newCSVContent = generateCSVContent(newIterations);
      setCSVContent(newCSVContent);

      // Update other states
      setIterations(newIterations);
      setUploadResult({
        ...response.data,
      });


      setStartTraffic(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDownloadCSV = () => {
    downloadCSV(csvContent);
  };

  const iterationCallback = (iterationInfo) => {
    // Handle the iteration information as needed
    console.log('Iteration Info:', iterationInfo);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cloud Computing Project 2023</h2>
      <div className="card p-4">
        <h3 className="mb-4">Upload a file and calculate average value</h3>
        <input type="file" className="form-control-sm mb-2" onChange={handleFileChange} />
        <div className="mb-2">
          <label>Select Endpoint:</label>
          <select value={selectedEndpoint} onChange={handleEndpointChange}>
            <option value="server">Server Endpoint</option>
            <option value="serverless">Serverless Endpoint</option>
          </select>
        </div>
        <button className="btn btn-primary btn-sm mb-1" onClick={handleUpload}>
          Upload
        </button>
        <ThresholdInput threshold={threshold} onThresholdChange={handleThresholdChange} />

        {uploadResult && (
          <div className="upload-result mt-3">
            
          </div>
        )}
        {csvContent && (
          <div className="download-csv mt-3">
            <button className="btn btn-success btn-sm" onClick={handleDownloadCSV}>
              Download CSV
            </button>
          </div>
        )}

        {iterations.length > 0 && <IterationsTable iterations={iterations} />}
      </div>
    </div>
  );
};

export default FileUploader;
