import React, { memo } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { NewsType } from "../../types/newsType";
import { formatDateInput } from "../../utils/handlers/formatDateInput";

const NewsItem = memo(({ news }: { news: NewsType }) => {
  const navigate = useNavigate();
  const state = { news } as NavigateOptions;

  const constent =
    news.content.length > 550
      ? news.content.slice(0, 550) + "..."
      : news.content;

  const handleViewNews = () => {
    navigate(`/tin-tuc/${news.title}`, { state });
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "row",
        borderRadius: 1,
        overflow: "hidden",
        gap: 3,
      }}
    >
      {/* <img
        src={news.image}
        alt={news.title}
        style={{ width: "40%", height: "100%", objectFit: "cover" }}
      /> */}
      <Box p={5}>
        <Typography fontWeight={600} fontSize={32}>
          {news.title}
        </Typography>

        <div dangerouslySetInnerHTML={{ __html: constent }} />

        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            gap={5}
          >
            <Typography fontSize={20}>
              {formatDateInput(news.createdAt)}
            </Typography>
            <Typography fontSize={25} fontWeight={600}>
              {news.viewCount} lượt xem
            </Typography>
          </Box>

          <Button color="success" onClick={handleViewNews}>
            Đọc thêm <ArrowRightAltIcon />
          </Button>
        </Box>
      </Box>
    </Paper>
  );
});

export default NewsItem;
