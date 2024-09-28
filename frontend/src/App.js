import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import HomePage from './pages/HomePage';
import AdminDashboard from './components/AdminDashboard';
import StudentPortal from './components/StudentPortal';
// import CertificateList from './components/CertificateList';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/student">Student Portal</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* <Route exact path="/" component={HomePage} /> */}
          {/* <Route path="/certificates" component={CertificateList} /> */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student" element={<StudentPortal />} />
          <Route path="/" element={<h2>Welcome to the Certificate Verification System</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
