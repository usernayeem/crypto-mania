import React from "react";
import { Box, Typography } from "@mui/material";

const Card = ({ heading, value }) => {
  return (
    <Box
      sx={{
        width: "300px",
        height: "200px",
        border: "1px solid",
        borderColor: "primary.main",
        borderRadius: "10px",
        mt: 1,
      }}
    >
      <Typography
        sx={{
          m: 3,
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        {heading}
      </Typography>
      <Typography sx={{ m: -3, fontSize: 30, overflowX: "auto" }}>
        {value}
      </Typography>
    </Box>
  );
};

export default Card;
