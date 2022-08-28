import React, { useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = ({ setThemeMode }) => {
  // Theme mode: false = dark, true = light
  const [mode, setMode] = useState(false);

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: mode ? "#fff" : "#000",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
        <Typography
          variant="h4"
          color={mode ? "#000" : "#fff"}
          fontWeight="bold"
          pl={1}
          sx={{ display: { xs: 'none', sm: 'none', md: 'block'}}}
        >
          CloneTube
        </Typography>
      </Link>

      {/* Search bar */}
      <SearchBar />

      {/* Dark/Light mode */}
      <Stack direction="row" pr={{ md: 2, xs: 1}}>
        <Box
          onClick={() => {
            setThemeMode(true);
            setMode(true);
          }}
          sx={{
            display: !mode ? "block" : "none",
            color: mode ? '#000' : '#fff',
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <LightMode />
        </Box>
        <Box
          onClick={() => {
            setThemeMode(false);
            setMode(false);
          }}
          sx={{
            display: mode ? "block" : "none",
            color: mode ? '#000' : '#fff',
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <DarkMode />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Navbar;
