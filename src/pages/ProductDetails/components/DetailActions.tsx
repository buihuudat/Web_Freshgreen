import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { ProductType } from "../../../types/productType";
import CommentActions from "./CommentActions";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

const DetailActions = (product: ProductType) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Paper variant="outlined" sx={{ width: "100%", p: 4, minHeight: 300 }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ width: 300 }}
              label={<Typography fontWeight={600}>Mô tả</Typography>}
              {...a11yProps(0)}
            />
            <Tab
              sx={{ width: 300 }}
              label={<Typography fontWeight={600}>Nhận xét</Typography>}
              {...a11yProps(1)}
            />
            <Tab
              sx={{ width: 300 }}
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
          <CommentActions />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Typography>
            Bán bởi: <b style={{ fontSize: 20 }}>{product.shop}</b>
          </Typography>
        </CustomTabPanel>
      </Paper>
    </Box>
  );
};

export default DetailActions;
