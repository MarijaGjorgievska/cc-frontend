import React from 'react';

const IterationsTable = ({ iterations }) => {
  return (
    <div className="mt-4">
      <h3>Iterations Table</h3>
      <table className="table table-striped table-bordered table-hover table-success">
        <thead className="thead-dark">
          <tr>
            <th>Iteration</th>
            <th>Number of Requests</th>
            <th>Processing Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(iterations) && iterations.length > 0 ? (
            iterations.map((iteration) => (
              <tr key={iteration.iteration}>
                <td>{iteration.iteration}</td>
                <td>{iteration.requests}</td>
                <td>{iteration.totalProcessingTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No iterations available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IterationsTable;