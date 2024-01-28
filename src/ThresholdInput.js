import React from 'react';

const ThresholdInput = ({ threshold, onThresholdChange }) => {
  return (
    <div className="mb-2">
      <label htmlFor="thresholdInput" className="form-label">
        Threshold:
      </label>
      <input
        type="number"
        className="form-control form-control-sm"
        id="thresholdInput"
        value={threshold}
        onChange={onThresholdChange}
      />
    </div>
  );
};

export default ThresholdInput;