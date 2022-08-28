import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Sidebar, Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);

  const { searchTerm } = useParams();

  // Fetch suggested videos to display in videos section
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
      setVideos(data.items)
    );
  }, []);

  return (
    // Display videos section
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: "2" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={2}
        sx={{ color: "white", textAlign: "center" }}
      >
        Search Results for{" "}
        <span style={{ color: "var(--red-color)" }}>{searchTerm}</span> videos
      </Typography>

      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
