import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Slider,
  SliderThumb,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/material/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { mainColor } from "../../utils/Constants/colors";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { productActions } from "../../actions/productActions";
import {
  FilterDataCheckbox,
  FilterDataSelection,
} from "./components/data/DataFilter";
import ProductList from "./components/ProductList";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: mainColor,
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <AttachMoneyIcon />
    </SliderThumb>
  );
}

const Products = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<[number, number]>([20, 40]);
  const [categorySelected, setCategorySelected] = useState<string[]>([]);
  const [storeSelected, setStoreSelected] = useState<string[]>([]);
  const [tagsSelected, setTagsSelected] = useState<string>("tags/new");

  const [countPage, setCountPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dispatch = useAppDispatch();
  const { products, totalProducts } = useAppSelector(
    (state: RootState) => state.product
  );
  const numberOfProductShow: number = 8;

  useEffect(() => {
    dispatch(
      productActions.gets({ page: currentPage, perPage: numberOfProductShow })
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, currentPage]);

  useEffect(() => {
    setCountPage(Math.ceil(totalProducts / numberOfProductShow));
  }, [totalProducts]);

  const handleChangePrice = useCallback((e: any) => {
    setNewPrice(e.target.value);
  }, []);

  const handleChecked = (e: string) => {
    const [category, select] = e.split("/");

    switch (category) {
      case "category":
        if (categorySelected.includes(select)) {
          setCategorySelected((prevSelected) =>
            prevSelected.filter((item) => item !== select)
          );
        } else {
          setCategorySelected((prevSelected) => [...prevSelected, select]);
        }
        break;
      default:
        if (storeSelected.includes(select)) {
          setStoreSelected((prevSelected) =>
            prevSelected.filter((item) => item !== select)
          );
        } else {
          setStoreSelected((prevSelected) => [...prevSelected, select]);
        }
        break;
    }
  };

  const handleSelect = (e: any) => {
    setTagsSelected(e.target.value);
  };

  const handleFilter = () => {
    console.log(categorySelected, storeSelected, tagsSelected);
  };

  const handleReset = () => {};

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: 160,
          height: 60,
          p: 1,
        }}
        onClick={() => setIsShow(!isShow)}
      >
        <FilterAltIcon />
        <Typography fontSize={15} fontWeight={600}>
          Bộ lọc
        </Typography>
        <ArrowDropDownIcon />
      </Button>
      <Paper
        variant="outlined"
        sx={{
          my: 5,
          height: isShow ? 500 : 0,
          transition: "height .3s ",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            display: "flex",
            m: 3,
          }}
        >
          <Box
            width={"60%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            {FilterDataCheckbox.map((value, index) => (
              <Box key={index}>
                <Typography pb={3} fontSize={23} fontWeight={600}>
                  {value.title}
                </Typography>
                <FormGroup sx={{ height: 250, overflow: "auto" }}>
                  {value.selection.map((child: any, i: number) => (
                    <FormControlLabel
                      control={<Checkbox />}
                      label={child.text}
                      key={i}
                      onClick={() => handleChecked(child.active)}
                    />
                  ))}
                </FormGroup>
              </Box>
            ))}
            <FormControl sx={{ width: 200 }}>
              <InputLabel id="demo-simple-select-label">
                {FilterDataSelection.title}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tagsSelected}
                label={FilterDataSelection.title}
                onChange={handleSelect}
              >
                {FilterDataSelection.selection.map(
                  (child: any, index: number) => (
                    <MenuItem value={child.active} key={index}>
                      {child.text}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>
          <Box width={"30%"}>
            <Box>
              <Typography pb={3} fontSize={23} fontWeight={600}>
                Theo Giá
              </Typography>
              <AirbnbSlider
                slots={{ thumb: AirbnbThumbComponent }}
                getAriaLabel={(index) =>
                  index === 0 ? "Minimum price" : "Maximum price"
                }
                value={newPrice}
                onChange={handleChangePrice}
              />
              <Typography>
                Phạm vi:{" "}
                <b>
                  {newPrice[0]} - {newPrice[1]}
                </b>
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          p={3}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={5}
        >
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: 120,
              height: 40,
              p: 1,
            }}
            onClick={handleFilter}
          >
            <FilterAltIcon />
            <Typography fontSize={15} fontWeight={600}>
              Lọc
            </Typography>
          </Button>
          <Button color="error" sx={{ fontWeight: 600 }} onClick={handleReset}>
            Xóa tất cả
          </Button>
        </Box>
      </Paper>

      <ProductList products={products} />

      <Stack
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          p: 5,
        }}
      >
        <Pagination
          onChange={handleChangePage}
          count={countPage}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default Products;
