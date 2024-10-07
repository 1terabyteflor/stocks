import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StockInfo from './components/StockInfo';

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock/:symbol" element={<StockInfo />} />
    </Routes>
</Router>
);
}

export default App;
