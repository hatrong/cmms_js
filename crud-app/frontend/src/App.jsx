import React from 'react';
import CrudComponent from './components/CrudComponent';
import './styles/index.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">CRUD Application</h1>
        <CrudComponent />
      </div>
    </div>
  );
};

export default App;