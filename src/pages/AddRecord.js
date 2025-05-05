import React, { useState } from 'react';
import AddWashForm from '../components/forms/AddWashForm';
import AddFuelRecordForm from '../components/forms/AddFuelRecordForm';

const AddRecord = () => {
  const [activeTab, setActiveTab] = useState('wash');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-6 flex space-x-4">
        <button
          className={`px-6 py-2 rounded-lg font-semibold shadow ${activeTab === 'wash' ? 'bg-blue-500 text-white' : 'bg-white border text-gray-800'}`}
          onClick={() => setActiveTab('wash')}
        >
          Add Wash
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold shadow ${activeTab === 'fuel' ? 'bg-blue-500 text-white' : 'bg-white border text-gray-800'}`}
          onClick={() => setActiveTab('fuel')}
        >
          Add Fuel Record
        </button>
      </div>

      {activeTab === 'wash' ? <AddWashForm /> : <AddFuelRecordForm />}
    </div>
  );
};

export default AddRecord;
