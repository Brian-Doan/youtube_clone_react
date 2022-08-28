import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Sidebar, Videos } from "./";

const Feed = ({ themeMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  // Fetch suggested videos to display in videos section
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) =>
        setVideos(data.items)
      );
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      {/* Sidebar section */}
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          themeMode={themeMode}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: themeMode ?  "#000" : "#fff" }}
        >
          &copy; Copyright 2022, Brian
        </Typography>
      </Box>

      {/* Display videos section */}
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: "2" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: themeMode ?  "#000" : "#fff" }}
        >
          {selectedCategory}{" "}
          <span style={{ color: "var(--red-color)" }}>Videos</span>
        </Typography>

        <Videos videos={videos} themeMode={themeMode} />
      </Box>
    </Stack>
  );
};

export default Feed;
