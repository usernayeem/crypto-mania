import React from 'react';
import { Box, Typography } from '@mui/material';

const CoinRow = (props) => {
  const style = {
    img: {
      height: '20px',
      marginRight: '10px',
    },
  };

  return (
    <>
      <Box
        className="coinRow"
        sx={{
          bgcolor: 'transparent',
          border: '1px solid',
          borderColor: 'primary.main',
        }}
      >
        <Typography className="hidden">{props.coinRow.market_cap_rank}</Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img style={style.img} src={props.coinRow.image} alt="Crypto Image" />
          <Typography>{props.coinRow.name}</Typography>
        </Box>

        <Typography className='symbol'>{props.coinRow.symbol.toUpperCase()}</Typography>

        <Typography>${props.coinRow.current_price}</Typography>

        {props.coinRow.price_change_percentage_24h < 0 ? (
          <Typography className="hidden" style={{ color: 'red' }}>
            {props.coinRow.price_change_percentage_24h}%
          </Typography>
        ) : (
          <Typography className="hidden">
            {props.coinRow.price_change_percentage_24h}%
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CoinRow;