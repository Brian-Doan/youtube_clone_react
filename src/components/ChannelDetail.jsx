import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = ({ themeMode }) => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  // Fetch data of a specific channel
  useEffect(() => {
    // Fetch details of the channel
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    // Fetch videos uploaded by this channel
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      {/* Gradient background & Channel avatar */}
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(255,209,130,1) 0%, rgba(255,186,66,1) 35%, rgba(245,155,0,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />

        <ChannelCard channelDetail={channelDetail} marginTop="-110px" themeMode={themeMode} />
      </Box>

      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
