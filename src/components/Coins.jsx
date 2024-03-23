import React, { useState, useEffect } from 'react';
import CoinRow from './CoinRow';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { SkeletonComponent } from './Skeleton';

// This component displays a list of coins with pagination.
// It fetches the data from the CoinGecko API.
export const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  // The URL for fetching the data.
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';

  // This effect is triggered when the component mounts.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data using the URL.
        const response = await fetch(url);
        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the effect to fetch the data on mount.
    fetchData();
  }, []);

  // The current page and the number of items per page.
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the last item in the current page and the first item in the current page.
  const lastItemInPage = currentPage * itemsPerPage;
  const firstItemInPage = lastItemInPage - itemsPerPage;

  // Slice the coins array to get the coins in the current page.
  const items = coins.slice(firstItemInPage, lastItemInPage);

  // Calculate the number of pages and create an array of page numbers.
  const nPage = Math.ceil(coins.length / itemsPerPage);
  const pagiNum = [...Array(nPage + 1).keys()].slice(1);

  return (
    <>
      <div className="coinHeader">
        <p className="hidden">Rank</p>
        <p>Name</p>
        <p className='symbol'>Symbol</p>
        <p>Price</p>
        <p className="hidden">24h Change</p>
      </div>
      {loading ? (
        <div>
          <SkeletonComponent />
          <Pagination
            className="pagination"
            count={10}
            color="primary"
          />
        </div>
      ) : (
        <div className='data'>
          {
            // Map the coins in the current page to CoinRow components.
            items.map((coinInfo) => (
              <Link to={`/coin/${coinInfo.id}`} key={coinInfo.id}>
                <CoinRow coinRow={coinInfo} />
              </Link>
            ))
          }
          <Pagination
            className="pagination"
            count={nPage}
            color="primary"
            onChange={(event, value) => setCurrentPage(value)}
          />
        </div>
      )}
    </>
  );
};

export default Coins;
