import {
  Box,
  Button,
  IconButton,
  Paper,
  Rating,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { mainColor } from "../../../utils/Constants/colors";
import { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ShareIcon from "@mui/icons-material/Share";
import { LoadingButton } from "@mui/lab";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";
import { moneyFormat } from "../../../utils/handlers/moneyFormat";
import { ProductType } from "../../../types/productType";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import _ from "lodash";
import ProductCard from "../../../components/common/ProductCard";
import { productActions } from "../../../actions/productActions";
import { cartActions } from "../../../actions/cartActions";
import { InitialShop, ShopType } from "../../../types/shopType";
import { shopAPI } from "../../../utils/api/shopApi";
import { checkFavorite } from "../../../redux/slices/favoriteSlice";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProductDetails = () => {
  const { state } = useLocation();
  const { product }: { product: ProductType } = state;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: RootState) => state.product.products);
  const userId = useAppSelector((state: RootState) => state.user.user)._id;
  const isFavorite = useAppSelector(
    (state: RootState) => state.favorite.isFavorite
  );

  const [shopInfo, setShopInfo] = useState<ShopType>(InitialShop);
  const [currentCountProduct, setCurrentCountProduct] = useState<number>(1);
  const [isLoading] = useState<boolean>(false);
  const [imageToShow, setImageToShow] = useState<string>(product.images[0]);
  const [value, setValue] = useState(0);

  const shopState = { shopInfo } as NavigateOptions;

  useEffect(() => {
    const getShopInfo = async () => {
      try {
        const res = await shopAPI.get(product.shop);
        setShopInfo(res.data);
      } catch (error) {
        return false;
      }
    };
    getShopInfo();
    dispatch(productActions.gets({ page: 1, perPage: 8 }));
    dispatch(checkFavorite(product._id));
  }, [dispatch, product._id, product.shop]);

  const handleAddCart = () => {
    dispatch(
      cartActions.addProductToCart({
        userId: userId as string,
        product: { ...product, count: 1 },
      })
    );
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const viewShop = () =>
    navigate("/cua-hang/" + shopInfo.name, { state: shopState });

  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        gap={10}
      >
        <Box sx={{ width: "50%" }}>
          <Paper
            variant="outlined"
            sx={{
              height: 800,
              py: 3,
              mx: 5,
            }}
          >
            <img
              src={imageToShow}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt={product.title}
            />
          </Paper>
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={1}
            pt={1}
            overflow={"auto"}
          >
            {product.images.map((image, i) => (
              <Paper
                key={i}
                sx={{
                  width: "max-content",
                  height: "max-content",
                  cursor: "pointer",
                }}
                component={Button}
                onClick={() => setImageToShow(image)}
              >
                <img
                  src={image}
                  alt="images"
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
              </Paper>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography
            fontSize={35}
            fontWeight={600}
            textTransform={"capitalize"}
          >
            {product.title}
          </Typography>
          <Box display={"flex"} flexDirection={"row"}>
            <Rating
              name="half-rating"
              defaultValue={product.averageStarRating}
              precision={0.5}
              readOnly
            />
            <Typography>
              ({product.star?.count > 0 ? product.star?.count : 0})
            </Typography>
          </Box>

          <Box display={"flex"} flexDirection={"row"} py={5} gap={2}>
            <Typography color={mainColor} fontSize={50} fontWeight={600}>
              {moneyFormat(product.lastPrice)}
            </Typography>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography color={"orange"}>-{product.discount}%</Typography>
              <Typography
                sx={{ textDecoration: "line-through" }}
                fontSize={30}
                color={"#ddd"}
              >
                {moneyFormat(product.price)}
              </Typography>
            </Box>
          </Box>

          <Box
            pb={3}
            display={"flex"}
            flexDirection={"row"}
            gap={2}
            height={80}
            my={5}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={1}
              alignItems={"center"}
              py={3}
            >
              <IconButton
                color="warning"
                onClick={() =>
                  setCurrentCountProduct(
                    currentCountProduct > 1 ? currentCountProduct - 1 : 1
                  )
                }
                sx={{ height: 50 }}
              >
                -
              </IconButton>
              <TextField
                value={currentCountProduct}
                name="currentCountProduct"
                sx={{ width: 50 }}
                variant="standard"
              />
              <IconButton
                color="primary"
                onClick={() => setCurrentCountProduct(currentCountProduct + 1)}
                sx={{ height: 50 }}
              >
                +
              </IconButton>
            </Box>

            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleAddCart}
            >
              <AddShoppingCartIcon />
              Thêm vào giỏ hàng
            </Button>

            <LoadingButton loading={isLoading} variant="contained" size="large">
              Mua ngay
            </LoadingButton>
            <Button size="large" variant="outlined" color="error">
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
            <Button size="large" variant="outlined">
              <ShuffleIcon />
            </Button>
          </Box>

          <Typography>
            Bán bởi:{" "}
            <b
              onClick={viewShop}
              style={{ color: mainColor, cursor: "pointer" }}
            >
              {shopInfo.name}
            </b>
          </Typography>

          <Typography>
            Tình trạng: <b style={{ color: mainColor }}>Còn hàng</b>
          </Typography>

          <Typography>
            Danh mục: <b>{product.category}</b>
          </Typography>
          <Typography>
            Thương hiệu: <b>{product.brand}</b>
          </Typography>
        </Box>
      </Box>

      {/* social */}
      <Box my={3}>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <ShareIcon color="primary" /> <b> Chia sẻ điều này</b>
        </Typography>
        <Box>
          <IconButton color="primary">
            <FacebookIcon />
          </IconButton>
          <IconButton color="success">
            <TwitterIcon />
          </IconButton>
          <IconButton color="warning">
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>

      {/* view more */}
      <Paper variant="outlined" sx={{ width: "100%", p: 4, minHeight: 300 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={<Typography fontWeight={600}>Mô tả</Typography>}
              {...a11yProps(0)}
            />
            <Tab
              label={<Typography fontWeight={600}>Nhận xét</Typography>}
              {...a11yProps(1)}
            />
            <Tab
              label={<Typography fontWeight={600}>Nhà cung cấp</Typography>}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box>
            <Typography>
              Tên sản phẩm: <b style={{ fontSize: 20 }}>{product.title}</b>
            </Typography>
            <Typography>
              Danh mục: <b style={{ fontSize: 20 }}>{product.category}</b>
            </Typography>
          </Box>
          <Typography
            pt={2}
            fontWeight={600}
            fontSize={18}
            sx={{ textDecoration: "underline" }}
          >
            Chi tiết
          </Typography>
          <div
            style={{ wordWrap: "break-word" }}
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Typography>
            Bán bởi: <b style={{ fontSize: 20 }}>{product.shop}</b>
          </Typography>
        </CustomTabPanel>
      </Paper>

      <Box py={5}>
        <Typography fontSize={30} fontWeight={600}>
          Bạn cũng có thể thích
        </Typography>
        <hr color="#ddd" />

        <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={3}>
          {_.orderBy(
            _.filter(
              products,
              (p: ProductType) => p.category === product.category
            ),
            ["createdAt"],
            ["desc"]
          )
            .slice(0, 4)
            .map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
        </Box>
      </Box>

      {/* lien quan */}

      <Box py={4}>
        <Typography fontSize={30} fontWeight={600}>
          Các sản phẩm liên quan
        </Typography>
        <hr color="#ddd" />

        <Box
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          gap={3}
          justifyContent={"space-between"}
        >
          {products.slice(0, 8).map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
