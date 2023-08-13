import { Box, Paper, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import Search from "../../components/common/Search";
import { mainColor } from "../../utils/Constants/colors";
import NewsRecently from "../../components/common/NewsRecently";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { newsActions } from "../../actions/newsActions";

const News = () => {
  const temoCategoryData = [
    { title: "Ecommerce", count: 0 },
    { title: "Fashion", count: 0 },
    { title: "Electro", count: 0 },
    { title: "Commercial", count: 0 },
  ];

  const newsList = useAppSelector((state: RootState) => state.news.newsList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(newsActions.gets());
  }, [dispatch]);

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
    >
      <Box width={"75%"}>
        <Outlet />
      </Box>
      <Box width={"20%"}>
        <Search placeholder="Tìm..." />

        <Paper variant="outlined" sx={{ p: 2, my: 5 }}>
          <Typography fontWeight={600}>DANH MỤC</Typography>
          <hr color="#555" />

          <Box>
            {temoCategoryData.map((category, index) => (
              <Box key={index}>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    fontSize={15}
                    color={mainColor}
                    sx={{ cursor: "pointer" }}
                  >
                    {category.title}
                  </Typography>
                  <Typography>({category.count})</Typography>
                </Box>
                {temoCategoryData.length - 1 !== index && (
                  <hr style={{ height: ".5px" }} />
                )}
              </Box>
            ))}
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, my: 5 }}>
          <Typography fontWeight={600}>BÀI VIẾT GẦN ĐÂY</Typography>
          <hr color="#555" />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            gap={2}
          >
            {newsList.slice(0, 8).map((news, index) => (
              <NewsRecently key={index} news={news} />
            ))}
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, my: 5 }}>
          <Typography fontWeight={600} fontSize={23}>
            Tags Phổ biến nhất
          </Typography>
          <hr color="#555" />
        </Paper>
      </Box>
    </Box>
  );
};

export default News;
