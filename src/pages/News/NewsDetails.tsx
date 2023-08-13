import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { NewsType } from "../../types/newsType";

const NewsDetails = () => {
  const { state } = useLocation();
  const news: NewsType = state.news;

  return (
    <Box>
      <Typography
        textAlign={"center"}
        fontWeight={600}
        fontSize={30}
        pb={3}
        textTransform={"capitalize"}
      >
        {news.title}
      </Typography>

      <div dangerouslySetInnerHTML={{ __html: news.content }} />
    </Box>
  );
};

export default NewsDetails;
