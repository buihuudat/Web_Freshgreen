import { CommentType } from "../../../../types/commentType";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
const CommentItem = (comment: CommentType) => {
  return (
    <Paper elevation={1} key={comment._id}>
      <Box margin={"0 auto"} p={1}>
        <Box>
          <Button
            size="small"
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              pb: 2,
            }}
            color="success"
          >
            <Avatar src={comment.auth.avatar} />
            <Typography fontSize={16} fontWeight={600}>
              {`${comment.auth.fullname.firstname} ${comment.auth.fullname.lastname}`}
            </Typography>
          </Button>
          <Typography>{comment.content}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CommentItem;
