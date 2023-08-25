import {
  Box,
  Button,
  IconButton,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { mainColor } from "../../utils/Constants/colors";
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
import { useLocation, useNavigate } from "react-router-dom";
import { moneyFormat } from "../../utils/handlers/moneyFormat";
import { ProductType } from "../../types/productType";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import _ from "lodash";
import ProductCard from "../../components/common/ProductCard";
import { productActions } from "../../actions/productActions";
import { cartActions } from "../../actions/cartActions";
import { NotificationToast } from "../../utils/handlers/NotificationToast";
import { favoriteActions } from "../../actions/favoriteActions";
import { addProductCompare } from "../../redux/slices/compareSlice";
import DetailActions from "./components/DetailActions";
import commentActions from "../../actions/commentActions";

const ProductDetails = () => {
  const { state } = useLocation();
  const { product }: { product: ProductType } = state;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: RootState) => state.product.products);
  const userId = useAppSelector((state: RootState) => state.user.user)._id;
  const favoriteProducts = useAppSelector(
    (state: RootState) => state.favorite.favoriteProducts
  );
  const isFavorite = favoriteProducts.filter(
    (p) => p._id === product._id
  ).length;

  const [currentCountProduct, setCurrentCountProduct] = useState<number>(1);
  const [isLoading] = useState<boolean>(false);
  const [imageToShow, setImageToShow] = useState<string>(product.images[0]);

  useEffect(() => {
    dispatch(productActions.gets({ page: 1, perPage: 8 }));
    dispatch(commentActions.getProductComments(product._id as string));
  }, [dispatch, product._id]);

  const handleAddCart = () => {
    dispatch(
      cartActions.addProductToCart({
        userId: userId as string,
        product: { ...product, count: currentCountProduct },
      })
    );
  };

  const handleAddFavorite = () => {
    if (!userId) {
      NotificationToast({ message: "Bạn chưa đăng nhập", type: "warning" });
      return false;
    }
    dispatch(
      favoriteActions.update({
        userId: userId as string,
        product,
      })
    );
  };

  const handleCompare = () => {
    dispatch(addProductCompare(product));
  };

  const viewShop = () => navigate("/cua-hang/" + product.shop?.name);

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
              height: "max-content",
              py: 3,
              mx: 5,
            }}
          >
            <img
              src={imageToShow}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
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
                  style={{ width: 100, height: "auto", objectFit: "cover" }}
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
            <Button
              size="large"
              variant="outlined"
              color="error"
              onClick={handleAddFavorite}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
            <Button size="large" variant="outlined" onClick={handleCompare}>
              <ShuffleIcon />
            </Button>
          </Box>

          <Typography>
            Bán bởi:{" "}
            <b
              onClick={viewShop}
              style={{ color: mainColor, cursor: "pointer" }}
            >
              {product.shop?.name}
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
      <DetailActions {...product} />

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
