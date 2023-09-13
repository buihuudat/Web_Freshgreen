import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import React from "react";

const SkeletonLoading = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      gap={10}
    >
      <Box sx={{ width: { sm: "50%", xs: "100%" } }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={500}
          animation="wave"
        />
      </Box>
      <Box sx={{ width: { sm: "50%", xs: "100%" } }}>
        <Skeleton variant="text" width="80%" animation="wave" />
      </Box>
    </Box>
  );
};

export default SkeletonLoading;
