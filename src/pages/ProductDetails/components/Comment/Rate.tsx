import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";

const labels: { [index: string]: string } = {
  0.5: "Không có ích",
  1: "Không có ích+",
  1.5: "Yếu",
  2: "Yếu+",
  2.5: "Tạm được",
  3: "Tạm được+",
  3.5: "Tốt",
  4: "Tốt+",
  4.5: "Xuất sắc",
  5: "Xuất sắc+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

interface RateProps {
  value: number | null;
  setValue: (value: number | null) => void;
}
const Rate = React.memo((props: RateProps) => {
  const { value, setValue } = props;
  const [hover, setHover] = React.useState(-1);
  const user = useAppSelector((state: RootState) => state.user.user);

  return (
    <Box
      sx={{
        width: 250,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        disabled={!user.username}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
});

export default Rate;
