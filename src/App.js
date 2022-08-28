import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
} from "./components";

const App = () => {
  const [themeMode, setThemeMode] = useState(false)

  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: themeMode ? '#fff' : '#000' }}>
        <Navbar setThemeMode={(value) => setThemeMode(value)} />
        <Routes>
          <Route path="/" exact element={<Feed themeMode={themeMode} />} />
          <Route path="/video/:id" exact element={<VideoDetail themeMode={themeMode} />} />
          <Route path="/channel/:id" exact element={<ChannelDetail themeMode={themeMode} />} />
          <Route path="/search/:searchTerm" exact element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
