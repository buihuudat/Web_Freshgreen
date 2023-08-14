import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { FeaturedCategoryData } from "./data/HomeData";
import { FeaturedCategoryDataType } from "../../../types/homeType";

const HomeFeaturedCategory: React.FC = () => {
  return (
    <Box py={5}>
      <Typography fontWeight={600} fontSize={35} pb={3}>
        Danh mục nổi bật
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        {FeaturedCategoryData.map((data: FeaturedCategoryDataType, index) => (
          <Paper
            key={index}
            sx={{ width: 200, textDecoration: "none" }}
            component={NavLink}
            to={data.title}
            elevation={6}
          >
            <img
              src={data.image}
              alt={data.title}
              style={{ width: "100%", height: 150, objectFit: "cover" }}
            />
            <Typography fontWeight={600} align="center" fontSize={18}>
              {data.title}
            </Typography>
            <Typography align="center" fontSize={14}>
              {data.count} mục
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default HomeFeaturedCategory;
