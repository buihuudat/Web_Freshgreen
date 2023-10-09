import { Box, Paper, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { CategoryType } from "../../../types/categoryType";

interface Props {
  categories: Array<CategoryType>;
}

const HomeFeaturedCategory = (props: Props) => {
  const { categories } = props;
  console.log(categories);

  return (
    <Box py={5} display={{ xs: "none", sm: "block" }}>
      <Typography fontWeight={600} fontSize={35} pb={3}>
        Danh mục nổi bật
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={{ xs: 2, sm: 5 }}
        p={{ xs: 2, sm: 3 }}
        sx={{
          width: { xs: "max-content", sm: "100%" },
          overflowX: { xs: "auto", sm: "none" },
        }}
      >
        {categories.map((category) => (
          <Paper
            key={category._id!}
            sx={{ width: { xs: 150, sm: 200 }, textDecoration: "none" }}
            component={NavLink}
            to={category.name}
            elevation={6}
          >
            <img
              src={category.image}
              alt={category.name}
              style={{ width: "100%", height: 150, objectFit: "cover" }}
            />
            <Typography fontWeight={600} align="center" fontSize={18}>
              {category.name}
            </Typography>
            <Typography align="center" fontSize={14}>
              {/* {category.count} mục */}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default HomeFeaturedCategory;
