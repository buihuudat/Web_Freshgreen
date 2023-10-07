import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Rating, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { mainColor } from "../../../constants/colors";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { ShopType } from "../../../types/shopType";
import { NoImage } from "../../../constants/images";

const StoreCard = ({ store }: { store: ShopType }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const state = { shopInfo: { ...store } } as NavigateOptions;

  useEffect(() => {
    setAddress(
      store.user?.address.more +
        " " +
        store.user?.address.street +
        " " +
        store.user?.address.ward +
        " " +
        store.user?.address.district +
        " " +
        store.user?.address.city
    );
  }, [store?.user]);

  return (
    <Paper
      sx={{
        width: { sm: 500, xs: "100%" },
        display: "flex",
        flexDirection: "row",
        gap: 3,
        p: 2,
        ":hover": { outline: `1px solid ${mainColor}` },
      }}
      elevation={8}
    >
      <Box>
        <img
          src={store.image || NoImage}
          alt={store.name}
          style={{
            width: window.innerWidth > 600 ? 200 : 100,
            height: window.innerWidth > 600 ? 200 : 100,
            objectFit: "cover",
          }}
        />
      </Box>

      <Box>
        <Typography fontWeight={600} color={"#555"} fontSize={15}>
          Kể từ {store.startYear}
        </Typography>
        <Typography fontWeight={600} fontSize={23}>
          {store.name}
        </Typography>
        <Box display={"flex"} pb={5}>
          <Rating name="read-only" value={store.star?.count} readOnly />
          <Typography>({store.averageStarRating})</Typography>
        </Box>

        <Typography>
          <LocationOnIcon sx={{ color: mainColor, fontSize: 18 }} />
          <b>Địa chỉ: </b>
          {address}
        </Typography>
        <Typography>
          <LocalPhoneIcon sx={{ color: mainColor, fontSize: 18 }} />
          <b>Số điện thoại: </b>
          {store.user?.phone}
        </Typography>

        <Button
          color="success"
          variant="contained"
          onClick={() => navigate(`/cua-hang/${store.name}`, { state })}
          sx={{ mt: 2 }}
        >
          Xem cửa hàng <ArrowRightAltIcon />
        </Button>
      </Box>
    </Paper>
  );
};

export default React.memo(StoreCard);
