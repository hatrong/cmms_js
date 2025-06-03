import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrudComponent from './components/CrudComponent';

const App = () => {
  return (
    <Router>
      <div className="app">
        <h1 className="text-3xl font-bold text-center my-4">CRUD Application</h1>
        <Routes>
          <Route path="/" element={<CrudComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;