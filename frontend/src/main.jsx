import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar from './navbar.jsx'
import Search from './search.jsx';
import SongDetails from './songdetails.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<Search />} />
        <Route path="/song/:id" element={<SongDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);