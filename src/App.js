import React from 'react';
import { Routes, Route } from 'react-router';
import Coins from './components/Coins';
import CoinDetail from './components/CoinDetail';

// App component
const App = () => {
  return (
    <div className='app'>
      <main>
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/coins/:coinId" element={<CoinDetail />} />
        </Routes>

      </main>
    </div>
  );
};

export default App;