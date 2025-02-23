import LoginSignup from './components/login/login.jsx';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
