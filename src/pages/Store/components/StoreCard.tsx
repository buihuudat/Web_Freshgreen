import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Paper, Rating, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { mainColor } from "../../../utils/Constants/colors";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { ShopType } from "../../../types/shopType";
import { NoImage } from "../../../utils/Constants/images";
import { InitialUser, UserType } from "../../../types/userType";
import { userApi } from "../../../utils/api/userApi";

const StoreCard = ({ store }: { store: ShopType }) => {
  const navigate = useNavigate();
  const [moreInfo, setMoreInfo] = useState<UserType>(InitialUser);
  const [address, setAddress] = useState("");
  const state = { shopInfo: { ...store, moreInfo } } as NavigateOptions;

  useEffect(() => {
    const getMoreInfo = async () => {
      try {
        const info = await userApi.getUser(store.user);
        info && setMoreInfo(info.data);
      } catch (error) {
        return false;
      }
    };
    getMoreInfo();
  }, [store.user]);

  useEffect(() => {
    setAddress(
      moreInfo.address.more +
        " " +
        moreInfo.address.street +
        " " +
        moreInfo.address.ward +
        " " +
        moreInfo.address.district +
        " " +
        moreInfo.address.city
    );
  }, [moreInfo.address]);

  return (
    <Paper
      sx={{
        width: 500,
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
          style={{ width: 200, height: 200, objectFit: "cover" }}
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
          {moreInfo.phone}
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
