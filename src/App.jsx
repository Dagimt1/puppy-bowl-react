import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SinglePlayer from './components/SinglePlayer';
import AllPlayers from './components/AllPlayers';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllPlayers />} />
        <Route path="/player/:id" element={<SinglePlayer />} />
      </Routes>
    </Router>
  );
};

export default App;
