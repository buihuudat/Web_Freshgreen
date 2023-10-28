import { Badge, Box, IconButton, Typography, Avatar } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { mainColor } from "../../../constants/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CompareIcon from "@mui/icons-material/Compare";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Logo } from "../../../constants/images";
import { ListIconTypes } from "../../../types/dataTypes";
import { navbarDataItem } from "./components/Data/NavbarDataItem";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import Search from "../Search";
import { productActions } from "../../../actions/productActions";
import MenuIcon from "@mui/icons-material/Menu";
import NavMobile from "./components/NavMobile";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const path = pathname.split("/")[1];
  const user = useAppSelector((state: RootState) => state.user.user);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const countProductsCart: number =
    useAppSelector((state: RootState) => state.cart.data)?.products.length || 0;
  const countFavoriteProduct: number =
    useAppSelector((state: RootState) => state.favorite.favoriteProducts)
      .length || 0;
  const countCompareProduct: number =
    useAppSelector((state) => state.compare.products)?.length || 0;

  const ListIcons: ListIconTypes[] = [
    {
      title: "So sánh",
      icon: <CompareIcon />,
      badge: countCompareProduct,
      path: "/so-sanh",
    },
    {
      title: "Sản phẩm yêu thích",
      icon: <FavoriteIcon />,
      badge: countFavoriteProduct,
      path: "/san-pham-yeu-thich",
    },
    {
      title: "Giỏ hàng",
      icon: <ShoppingCartIcon />,
      badge: countProductsCart,
      path: "/gio-hang",
    },
    {
      title: "Tài khoản",
      icon: !user ? (
        <AccountCircleIcon />
      ) : (
        <Avatar src={user.avatar} alt="avatar" />
      ),
      badge: 0,
      path: "/tai-khoan",
    },
  ];

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(productActions.searchProducts(searchQuery));
  }, [searchQuery, dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      sx={{ backdropFilter: "blur(1000px)", padding: 1 }}
      zIndex={1000}
      px={{ sm: 10, xs: 3 }}
    >
      <Box
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ display: "flex" }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <img
          onClick={() => navigate("/")}
          src={Logo}
          alt="logo"
          style={{
            width: "16%",
            maxWidth: 120,
            height: "auto",
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
        <Search
          placeholder="Tìm kiếm sản phẩm ưa thích..."
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <Box display={{ xs: "none", sm: "flex" }} flexDirection={"row"} gap={2}>
          {navbarDataItem.map(
            (value, index) =>
              value.show && (
                <Typography
                  component={NavLink}
                  key={index}
                  fontSize={16}
                  fontWeight={600}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color:
                      path === value.path.split("/")[1] ? mainColor : "#000",
                    ":hover": {
                      color: mainColor,
                    },
                  }}
                  to={value.path}
                >
                  {value.item}
                </Typography>
              )
          )}
        </Box>

        <Box
          width={"15rem"}
          display={"flex"}
          flexDirection={"row"}
          gap={{ xs: 1, sm: 2 }}
        >
          {ListIcons.map((value, index) => (
            <IconButton
              onClick={() => navigate(value.path)}
              aria-label="cart"
              key={index}
              title={value.title}
              sx={{ width: { xs: 35, sm: 50 }, height: { xs: 35, sm: 50 } }}
            >
              <Badge badgeContent={value.badge} color="success">
                {value.icon}
              </Badge>
            </IconButton>
          ))}
        </Box>

        <Box
          display={{ xs: "none", sm: "flex" }}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <SupportAgentIcon sx={{ fontSize: 60 }} />
          <Box>
            <Typography fontSize={30} color={mainColor} fontWeight={600}>
              1900 - 1009
            </Typography>
            <Typography fontSize={15} color={"#555"} textAlign={"center"}>
              Trung tâm hỗ trợ 24/7
            </Typography>
          </Box>
        </Box>
      </Box>

      <NavMobile
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        user={user!}
      />
    </Box>
  );
};

export default Navbar;
