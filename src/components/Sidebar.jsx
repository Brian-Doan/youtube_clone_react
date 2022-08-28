import React from "react";
import { Stack } from "@mui/material";

import { categories } from "../utils/constants";

const Sidebar = ({ selectedCategory, setSelectedCategory, themeMode }) => {
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category, index) => (
        <button
          key={`${category}-${index}`}
          type="button"
          className="category-btn"
          style={{
            background: category.name === selectedCategory && "#fc1503",
            color: themeMode ?  "#000" : "#fff",
          }}
          onClick={() => setSelectedCategory(category.name)}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "red",
              marginRight: "15px",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
              // Use this statement to override style:color we set for the button
              color: !themeMode || category.name === selectedCategory ? "#fff" : "#000"
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Sidebar;
