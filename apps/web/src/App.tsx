import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Store from './pages/Store';
import History from './pages/History';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* تحويل الرابط الرئيسي مباشرة إلى لوحة التحكم */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/store" element={<Store />} />
          <Route path="/profile" element={<History />} /> {/* ربطنا الملف بالسجل كجزء من ملف الملك */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
