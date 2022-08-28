import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Stack, Box, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = ({ themeMode }) => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [channelID, setChannelID] = useState("");
  const [channelDetail, setChannelDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  const { id } = useParams();

  // Fetch details of a specific video
  useEffect(() => {
    // Fetch video's details
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data.items[0]);
      setChannelID(data.items[0]?.snippet?.channelId);
    });

    // Fetch related videos
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setRelatedVideos(data?.items)
    );

    // Set channelId state for later use
  }, [id]);

  // Fetch channel's details
  useLayoutEffect(() => {
    fetchFromAPI(`channels?part=snippets&id=${channelID}`).then((data) => {
      setChannelDetail(data.items[0]);
    });
  }, [channelID]);

  if (!videoDetail?.snippet) {
    return "Loading...";
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }} gap={2}>
        <Box flex={1}>
          {/* Video player section */}
          <Box
            sx={{
              width: "100%",
              position: "sticky",
              top: "86px",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
              playing
            />
            <Typography
              color={themeMode ? "#000" : "#fff"}
              variant="h5"
              fontWeight="bold"
              p={2}
            >
              {title}
            </Typography>

            {/* Video's title, views and likes */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{ color: "#fff" }}
              px={2}
            >
              {/* Video's title */}
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color={themeMode ? "#000" : "#fff"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={channelDetail?.snippet?.thumbnails?.default?.url}
                    alt={channelTitle}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      marginRight: "5px",
                    }}
                  />
                  {channelTitle}
                  <CheckCircle
                    sx={{
                      fontSize: "12px",
                      color: "var(--gray-color)",
                      ml: "5px",
                    }}
                  />
                </Typography>
              </Link>

              {/* Views and Likes */}
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.7 }}
                  color={themeMode ? "#000" : "#fff"}
                >
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.7 }}
                  color={themeMode ? "#000" : "#fff"}
                >
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        {/* Related videos section */}
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={relatedVideos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
