import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import Card from './Card'

const CoinDetail = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCoin(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontFamily: 'Monospace', color: 'white', letterSpacing: 1.5, fontSize: 20 }} >{coin.id}</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
        <Card heading='24h High' value={coin.market_data?.high_24h ? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> : null} />
        <Card heading='24h Low' value={coin.market_data?.low_24h ? <p>${coin.market_data.low_24h.usd.toLocaleString()}</p> : null} />
        <Card heading='Market Cap' value={coin.market_data?.market_cap ? <p>${coin.market_data.market_cap.usd.toLocaleString()}</p> : null} />
      </Box>
    </>
  )
}

export default CoinDetail;