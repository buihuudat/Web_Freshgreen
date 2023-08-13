import { Box, IconButton, Typography, Button, Paper } from "@mui/material";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import { mainColor } from "../../utils/Constants/colors";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  ContactDataType,
  FooterDataType,
  FooterInfoDataType,
} from "../../types/dataTypes";
import { Banner, Logo } from "../../utils/Constants/images";

import LoyaltyIcon from "@mui/icons-material/Loyalty";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { NavLink } from "react-router-dom";
export const footerInfoData: FooterInfoDataType[] = [
  {
    title: "Công ty",
    childrent: [
      {
        item: "Về chúng tôi",
        url: "",
      },
      {
        item: "Tiếp thị liên tiếp",
        url: "",
      },
      {
        item: "Tuyển dụng",
        url: "",
      },
      {
        item: "Liên hệ",
        url: "",
      },
    ],
  },
  {
    title: "Danh mục sản phẩm",
    childrent: [
      {
        item: "Sữa",
        url: "",
      },
      {
        item: "Quần áo và làm đẹp",
        url: "",
      },
      {
        item: "Đồ chơi thú cưng",
        url: "",
      },
      {
        item: "Nguyên liệu làm bánh",
        url: "",
      },
      {
        item: "Trái cây tươi",
        url: "",
      },
      {
        item: "Rượu & đồ uống",
        url: "",
      },
    ],
  },
  {
    title: "Thông tin",
    childrent: [
      {
        item: "Liên hệ",
        url: "",
      },
      {
        item: "Về chúng tôi",
        url: "",
      },
      {
        item: "Điều khoản & quy định",
        url: "",
      },
      {
        item: "Chính sách đổi trả",
        url: "",
      },
      {
        item: "Chính sách vận chuyển",
        url: "",
      },
      {
        item: "Chính sách bảo mật",
        url: "",
      },
    ],
  },
];
const Footer = () => {
  const footerData: FooterDataType[] = [
    {
      icon: <LoyaltyIcon sx={{ fontSize: 40, color: mainColor }} />,
      title: "Giá & ưu đãi đãi tốt nhất",
      subtitle: "Cho đơn hàng từ $50",
    },
    {
      icon: <DeliveryDiningIcon sx={{ fontSize: 40, color: mainColor }} />,
      title: "Miễn phí vận chuyển",
      subtitle: "Dịch vụ tuyệt vời 24/7",
    },
    {
      icon: <RequestQuoteIcon sx={{ fontSize: 40, color: mainColor }} />,
      title: "Ưu đãi hàng ngày",
      subtitle: "Khi bạn đăng ký",
    },
    {
      icon: <DynamicFeedIcon sx={{ fontSize: 40, color: mainColor }} />,
      title: "Nhiều mặt hàng",
      subtitle: "Giảm giá cực lớn",
    },
    {
      icon: <AccountTreeIcon sx={{ fontSize: 40, color: mainColor }} />,
      title: "Dễ dàng hoàn trả",
      subtitle: "Trong vòng 30 ngày",
    },
  ];
  const contactData: ContactDataType[] = [
    {
      icon: <FacebookIcon />,
      title: "Facebook",
      url: "",
    },
    {
      icon: <TwitterIcon />,
      title: "Twitter",
      url: "",
    },
    {
      icon: <YouTubeIcon />,
      title: "Youtube",
      url: "",
    },
    {
      icon: <InstagramIcon />,
      title: "Instagram",
      url: "",
    },
  ];

  return (
    <Box pt={5}>
      {/* banner */}
      <Box
        sx={{
          background: `url(${Banner}) no-repeat`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: 400,
          borderRadius: 5,
          pl: "600px",
          pt: 10,
        }}
      >
        <Typography
          fontSize={40}
          fontWeight={600}
          fontFamily={"Overpass"}
          color={"#fff"}
        >
          Ở nhà & đáp ứng nhu cầu hàng ngày của bạn từ cửa hàng của chúng tôi
        </Typography>
        <Typography py={2} color={"#fff"}>
          Bắt đầu mua sắm với chúng tôi
        </Typography>
        <Box display={"flex"} flexDirection={"row"}>
          <input
            placeholder="Địa chỉ email của bạn"
            style={{
              borderRadius: 30,
              outline: "none",
              border: "none",
              padding: 10,
              width: 350,
              height: 50,
              fontSize: 20,
            }}
          />
          <Button color="success" variant="contained" sx={{ borderRadius: 30 }}>
            Đăng ký
          </Button>
        </Box>
      </Box>

      {/*  */}
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        py={5}
      >
        {footerData.map((data, index) => (
          <Paper
            key={index}
            sx={{
              background: "#D3DEDB",
              p: 2,
              borderRadius: "10px",
              width: 300,
              display: "flex",
              flexDirection: "row",
              gap: 1,
            }}
          >
            {data.icon}
            <Box>
              <Typography fontWeight={600} fontSize={18}>
                {data.title}
              </Typography>
              <Typography variant="body2">{data.subtitle}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* info */}
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Box>
          <img src={Logo} alt="logo" style={{ width: 200 }} />
          <Typography>Mẫu trang web cửa hàng tạp hóa tuyệt vời</Typography>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <LocationOnIcon sx={{ color: mainColor }} />
            <Typography fontWeight={600}>Địa chỉ:</Typography>
            <Typography>
              5171 W Campbell Ave undefined Kent, Utah 53127 United States
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <HeadphonesIcon sx={{ color: mainColor }} />
            <Typography fontWeight={600}>Gọi cho chúng tôi:</Typography>
            <Typography>0987654321</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <SendIcon sx={{ color: mainColor }} />
            <Typography fontWeight={600}>Email:</Typography>
            <Typography>dat@dat.com</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <AccessTimeIcon sx={{ color: mainColor }} />
            <Typography fontWeight={600}>Giờ làm việc:</Typography>
            <Typography></Typography>
          </Box>
        </Box>
        <Box
          width={"60%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          {footerInfoData.map((data, index) => (
            <Box display={"flex"} flexDirection={"column"} gap={1} key={index}>
              <Typography fontWeight={600} fontSize={18}>
                {data.title}
              </Typography>
              {data.childrent.map((value: any, i: number) => (
                <Typography
                  key={i}
                  component={NavLink}
                  to={value.url}
                  sx={{
                    textDecoration: "none",
                    ":hover": {
                      color: mainColor,
                    },
                  }}
                  color={"#000"}
                >
                  {value.item}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      <hr color={mainColor} />
      {/* laster */}
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>
          Bản quyền @ 2023 FoodShop. Phát triên bởi{" "}
          <a
            style={{
              textDecoration: "none",
              fontWeight: 600,
              color: mainColor,
            }}
            href="https://facebook.com/1951065541"
          >
            Bui Huu Dat
          </a>
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={1}
          alignItems={"center"}
        >
          <PhoneInTalkOutlinedIcon sx={{ fontSize: 50 }} />
          <Box>
            <Typography color={mainColor} fontWeight={600} fontSize={20}>
              1900 - 1009
            </Typography>
            <Typography fontSize={12}>Trung tâm Hỗ trợ 24/7</Typography>
          </Box>
        </Box>
        <Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            gap={3}
          >
            <Typography fontWeight={600}>Theo dõi chúng tôi</Typography>
            <Box>
              {contactData.map((value, index) => (
                <IconButton key={index} title={value.title} color={"success"}>
                  {value.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
          <Typography fontSize={12}>
            Giảm giá lên đến 15% cho lần đăng ký đầu tiên
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
