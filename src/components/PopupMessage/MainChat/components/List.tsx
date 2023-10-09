import { Avatar, Box, Divider, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { fullnameOfUser } from "../../../../types/userType";
import { mainColor } from "../../../../constants/colors";

const data = [
  {
    user: {
      fullname: {
        firstname: "test",
        lastname: "test",
      },
      avatar: "",
    },
    lastMessage: "string",
    time: "10:11",
    seen: false,
  },
  {
    user: {
      fullname: {
        firstname: "John",
        lastname: "Doe",
      },
      avatar: "",
    },
    lastMessage: "Hello!",
    time: "11:30",
    seen: true,
  },
  {
    user: {
      fullname: {
        firstname: "Alice",
        lastname: "Johnson",
      },
      avatar: "",
    },
    lastMessage: "Hi there!",
    time: "12:45",
    seen: false,
  },
  {
    user: {
      fullname: {
        firstname: "Bob",
        lastname: "Smith",
      },
      avatar: "",
    },
    lastMessage: "Good morning!",
    time: "09:15",
    seen: true,
  },
  {
    user: {
      fullname: {
        firstname: "Jane",
        lastname: "Doe",
      },
      avatar: "",
    },
    lastMessage: "Hey!",
    time: "14:20",
    seen: false,
  },
  {
    user: {
      fullname: {
        firstname: "Bob",
        lastname: "Smith",
      },
      avatar: "",
    },
    lastMessage: "Good morning!",
    time: "09:15",
    seen: true,
  },
  {
    user: {
      fullname: {
        firstname: "Jane",
        lastname: "Doe",
      },
      avatar: "",
    },
    lastMessage: "Hey!",
    time: "14:20",
    seen: false,
  },
  {
    user: {
      fullname: {
        firstname: "Bob",
        lastname: "Smith",
      },
      avatar: "",
    },
    lastMessage: "Good morning!",
    time: "09:15",
    seen: true,
  },
  {
    user: {
      fullname: {
        firstname: "Jane",
        lastname: "Doe",
      },
      avatar: "",
    },
    lastMessage: "Hey!",
    time: "14:20",
    seen: false,
  },
  {
    user: {
      fullname: {
        firstname: "Bob",
        lastname: "Smith",
      },
      avatar: "",
    },
    lastMessage: "Good morning!",
    time: "09:15",
    seen: true,
  },
  {
    user: {
      fullname: {
        firstname: "Jane",
        lastname: "Doe",
      },
      avatar: "",
    },
    lastMessage: "Hey!",
    time: "14:20",
    seen: false,
  },
  {
    user: {
      fullname: {
        firstname: "Bob",
        lastname: "Smith",
      },
      avatar: "",
    },
    lastMessage: "Good morning!",
    time: "09:15",
    seen: true,
  },
  {
    user: {
      fullname: {
        firstname: "Jane",
        lastname: "Doe",
      },
      avatar: "",
    },
    lastMessage: "Hey!",
    time: "14:20",
    seen: false,
  },
];

const ListItem = (data: any) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          paddingTop: 2,
          pr: 2,
        }}
      >
        <Avatar src={data.user?.avatar} />
        <Box width={"100%"}>
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={600}>
              {fullnameOfUser(data.user.fullname).length > 10
                ? fullnameOfUser(data.user.fullname).slice(0, 10) + "..."
                : fullnameOfUser(data.user.fullname)}
            </Typography>
            {data.seen && (
              <Box component={"li"} sx={{ color: mainColor }}></Box>
            )}
            <Typography
              fontWeight={600}
              color={"#777"}
              fontSize={13}
              fontStyle={"italic"}
            >
              {data.time}
            </Typography>
          </Box>
          <Typography fontSize={14} color={!data.seen ? "#555" : "#000"}>
            {data.lastMessage.length > 16
              ? data.lastMessage.slice(0, 16) + "..."
              : data.lastMessage}
          </Typography>
        </Box>
      </Box>
      <Divider variant="middle" sx={{ pt: 1 }} />
    </Box>
  );
};

function List() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <ListIcon />
        <Typography fontWeight={600}>Danh sách</Typography>
      </Box>
      <Box sx={{ overflowY: "auto", height: "90%" }}>
        {data.map((d, i) => (
          <ListItem {...d} key={i} />
        ))}
      </Box>
    </Box>
  );
}

export default List;
