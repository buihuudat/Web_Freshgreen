import { IconButton } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { mainColor } from "../../utils/Constants/colors";
import { useCallback, useEffect, useState } from "react";
const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {visible && (
        <IconButton
          onClick={handleClick}
          sx={{
            position: "fixed",
            right: 16,
            bottom: 16,
            color: mainColor,
            background: "#ddd",
            ":hover": {
              background: "#566",
            },
          }}
          size="large"
        >
          <ArrowDropUpIcon />
        </IconButton>
      )}
    </>
  );
};

export default ScrollTop;
