// src/components/KPIDATA.js
import React, { useState } from 'react';

const KPIDATA = () => {
  const [selectedSubType, setSelectedSubType] = useState(null);

  const handleSubTypeSelection = (subType) => {
    setSelectedSubType(subType);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">KPI Type</h2>

      <div className="space-x-4">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none ${
            selectedSubType === 'Allkpi' && 'bg-blue-700'
          }`}
          onClick={() => handleSubTypeSelection('Allkpi')}
        >
          Allkpi
        </button>
        <button
          className={`bg-blue-700 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none ${
            selectedSubType === 'Bootupkpi' && 'bg-green-700'
          }`}
          onClick={() => handleSubTypeSelection('Bootupkpi')}
        >
          Bootupkpi
        </button>
      </div>

      {selectedSubType === 'Allkpi' && <AllkpiForm />}
      {selectedSubType === 'Bootupkpi' && <BootupkpiFileUpload />}
    </div>
  );
};
const handleSubmit = async () => {
  // Construct the data to be sent to the backend
  const formData = {
    selectedSubType,
    iterations,
    inputValues,
  };

  try {
    // Make a POST request to your backend endpoint
    const response = await fetch('your-backend-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Form data saved successfully!');
    } else {
      console.error('Failed to save form data.');
    }
  } catch (error) {
    console.error('Error while saving form data:', error);
  }
};
const AllkpiForm = () => {
  const [iterations, setIterations] = useState(1);
  const [inputValues, setInputValues] = useState(Array.from({ length: iterations }, () => ({ centralHMI: '', clusterHMI: '', camera: '' })));

  const handleIterationChange = (value) => {
    setIterations(parseInt(value, 10) || 1);
  };

  const handleInputChange = (index, section, field, value) => {
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      
      // Initialize section as an object if not already initialized
      newValues[index][section] = newValues[index][section] || {};
  
      newValues[index][section][field] = value;
      return newValues;
    });
  };

  return (
    <form className="mt-6 space-y-4">
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm font-semibold text-gray-600">Build:</label>
          <input type="text" className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">Iterations:</label>
          <input
            type="number"
            value={iterations}
            onChange={(e) => handleIterationChange(e.target.value)}
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      </div>

      {Array.from({ length: iterations }, (_, index) => (
        <div key={index} className="flex space-x-4">
          <div className="flex-1">
            {/* <label className="block text-sm font-semibold text-gray-600">{`Iteration ${index + 1} - Central HMI:`}</label> */}
            <input
              // type="text"
              // value={inputValues[index]?.centralHMI || ''}
              // onChange={(e) => handleInputChange(index, 'centralHMI', 'hmi', e.target.value)}
              // className="mt-1 p-2 border rounded flex-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-600">{`Iteration ${index + 1} - Cluster HMI - Early HMI:`}</label>
            <input
              type="text"
              value={inputValues[index]?.clusterHMI?.earlyHMI || ''}
              onChange={(e) => handleInputChange(index, 'clusterHMI', 'earlyHMI', e.target.value)}
              className="mt-1 p-2 border rounded flex-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-600">{`Iteration ${index + 1} - Cluster HMI - Cluster Appeared:`}</label>
            <input
              type="text"
              value={inputValues[index]?.clusterHMI?.clusterAppeared || ''}
              onChange={(e) => handleInputChange(index, 'clusterHMI', 'clusterAppeared', e.target.value)}
              className="mt-1 p-2 border rounded flex-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-600">{`Iteration ${index + 1} - Cluster HMI - Full HMI:`}</label>
            <input
              type="text"
              value={inputValues[index]?.clusterHMI?.fullHMI || ''}
              onChange={(e) => handleInputChange(index, 'clusterHMI', 'fullHMI', e.target.value)}
              className="mt-1 p-2 border rounded flex-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-600">{`Iteration ${index + 1} - Central HMI - HMI:`}</label>
            <input
              type="text"
              value={inputValues[index]?.centralHMI?.hmi || ''}
              onChange={(e) => handleInputChange(index, 'centralHMI', 'hmi', e.target.value)}
              className="mt-1 p-2 border rounded flex-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-600">{`Iteration ${index + 1} - Camera - VP1:`}</label>
            <input
              type="text"
              value={inputValues[index]?.camera?.vp1 || ''}
              onChange={(e) => handleInputChange(index, 'camera', 'vp1', e.target.value)}
              className="mt-1 p-2 border rounded flex-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>
      ))}

      <div className="mt-4">
      <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const BootupkpiFileUpload = () => {
  return (
    <div className="mt-6">
      <label className="block text-sm font-semibold text-gray-600">Upload KPI:</label>
      <input type="file" className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500" />
    </div>
  );
};

export default KPIDATA;
