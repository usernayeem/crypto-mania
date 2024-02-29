import React from 'react';
import { Routes, Route } from 'react-router';
import Heading from './components/Heading';
import Coins from './components/Coins';
import CoinDetail from './components/CoinDetail';

// App component
const App = () => {
  return (
    <div className='app'>
      <Heading />
      <main>
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/coin/:coinId" element={<CoinDetail />} />
        </Routes>

      </main>
    </div>
  );
};

export default App;