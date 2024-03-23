import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as LinkR } from 'react-router-dom';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const IconBreadcrumbs = (props) => {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mx: 5, my: 2 }}>
        <LinkR to="/">
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="white"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
        </LinkR>
        <Typography
          sx={{ display: 'flex', alignItems: 'center', textTransform: 'capitalize', fontWeight: 'bold'}}
        >
          {props.crypto}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default IconBreadcrumbs;