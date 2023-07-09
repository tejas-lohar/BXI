import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Breadcrumbs from "../../components/Header/BreadCrumbHeader";
import User from "../../assets/Images/Message/User.png";
import MsgCloseIcon from "../../assets/Images/Message/MsgClose.png";
import MicrophoneIcon from "../../assets/Images/Message/Microphone.png";
import GalleryIcon from "../../assets/Images/Message/gallerynew.png";
import SendIcon from "../../assets/Images/Message/sendicons.png";
import EmojiIcon from "../../assets/Images/Message/Emoji.png";

import axios from "axios";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import InputEmoji, { async } from "react-input-emoji";
// import { getChats } from "../../redux/action/Chat/All-Chats";
import { searchChats } from "../../redux/action/Chat/Search-Chat";
import { createChat } from "../../redux/action/Chat/Create-Chat";
import { LastSeenSet } from "../../redux/action/Chat/LastSeen";
import { GetLastSeens } from "../../redux/action/Chat/GetLastSeen";
import { getMassages } from "../../redux/action/Chat/Get-Massages";
import { sendMassage } from "../../redux/action/Chat/Send-Massages";
import { sendFile } from "../../redux/action/Chat/SendFile";
import { GetFiles } from "../../redux/action/Chat/GetFiles";
import { useSelector, useDispatch } from "react-redux";
import useGetLoggedInUser from "../../Hooks/LoggedInUser/useGetLoggedInUser";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { getLoggedCompanyDetails } from "../../redux/action/Company/LoggedInCompanyAction";
import { useSearchParam } from "react-use";
import { notifications } from "../../redux/action/Notification/notification";
// import CompanyName from "../../components/CompanyName";
import Avatargenerator from "../../components/AvatarGenerator";
import Avatar from "@mui/material/Avatar";
import BlueTail from "../../assets/Message/BlueTail.png";
import GrayTail from "../../assets/Message/GrayTail.png";

import { useLocation, useParams } from "react-router";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
//Production ==> https://development-stage.bxi.unada.in/
//Testing ==> https://bxi-testing.unada.in/
const ENDPOINT =
  process.env?.BACKEND_URL ?? process.env.NODE_ENV === "production"
    ? "https://bxi-testing.unada.in/"
    : "http://localhost:7000/";

export let socket = socketIO(ENDPOINT, { transports: ["websocket"] }),
  selectedChatCompare;
let RecevieMessages_Dot = [];

const Message = () => {
  const backend_Chats = [];

  const [RecevieMessagesDot, setRecevieMessagesDot] = useState([]);
  const [RecevieMessagesDotNew, setRecevieMessagesDotNew] = useState(false);
  const [activeMessageBox, setActiveMessageBox] = useState();
  const [massages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [notification, setNotification] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [onlineUser, setOnlineUser] = useState([]);
  const [sendMassages, setsendMassages] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [sendMessageUser, setSendMessageUser] = useState(null);
  const [sendMessageUser1, setSendMessageUser1] = useState(null);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lastSeen, setLastSeen] = useState([]);
  const [activeLastSeen, setactiveLastSeen] = useState("");
  const [chatIdSet, setChatIdSet] = useState(null);
  const [search, setSearch] = useState("");
  const [image, setImage] = useState("");
  const [fileSet, setFileSet] = useState(false);
  const [massage_Type, setMassage_Type] = useState("");
  const [sendChat, setSendChat] = useState(null);
  const [recevieChat, setRecevieChat] = useState([]);
  const [RecevieMessgaeSolve, setRecevieMessgaeSolve] = useState(true);
  const [yesterdayLastSeen, setYesterdayLastSeen] = useState("");
  const [textInputMessages, setTextInputMessages] = useState("");
  const [open, setOpen] = React.useState(false);
  const [previcesMessage, setPrevicesMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
    setIsOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const dispatch = useDispatch();

  const { data: loggedInUserData } = useGetLoggedInUser();

  const { searchChat, loading } = useSelector((state) => state.searchChat);
  const { GetLastSeen } = useSelector((state) => state.getlastSeen);

  let login_User = loggedInUserData?.data?._id;
  let companyName = loggedInUserData?.data?.companyName;

  const { aLLMassages } = useSelector((state) => state.massages);
  const { allFiles } = useSelector((state) => state.getFiles);
  const { sendFiles } = useSelector((state) => state.sendFiles);
  const [imgUrlforview, setImgUrlforview] = useState(null);
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetLoggedInUser();

  const all_Massages = (item) => {
    dispatch(getMassages(item));
  };

  let massagesRe = "";
  searchChat?.map((chat) => {
    if (chat?._id == activeMessageBox?._id) {
      chat?.users.map((item) => {
        if (item.companyId !== login_User) {
          massagesRe = item.companyId;
        }
      });
    }
  });

  if (Array.isArray(aLLMassages)) {
    aLLMassages.map((item) => {
      backend_Chats.push({
        item: item.content,
        type: item.type,
        loginUser: login_User,
        recevieMassUserId: massagesRe,
        sender: item.sender,
        senderName: item.senderName,
        time: item.createdAt,
      });
    });
  } else {
    console.log("aLLMassages is not an array");
  }

  useEffect(() => {
    setMessages([...backend_Chats]);
  }, [activeMessageBox, aLLMassages]);

  let receiverId = "";
  let receiverId2 = "";
  let number = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(newMessage);
  let email = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(newMessage);

  const send_Massages = async () => {
    const now = new Date();
    const timestamp = now.toISOString();
    setImgurl("");

    if (number) {
      setTextInputMessages("Sending numbers is not allowed");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else if (email) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      setTextInputMessages("Sending email is not allowed");
    }

    if (!number && !email) {
      let massageType = "";
      setRecevieMessgaeSolve(true);
      setImgurl("");

      if (fileSet !== true) {
        massageType = "text";
        dispatch(sendMassage(newMessage, activeMessageBox, "text"));
      } else {
        massageType = "url";
        dispatch(sendMassage(newMessage, activeMessageBox, "url"));
        setFileSet(false);
      }

      // await setTimeout(() => {
      //   dispatch(searchChats(""));
      // }, 1000);

      if (receivedMessage == null) {
        setMessages([
          ...massages,
          {
            item: newMessage,
            type: massageType,
            loginUser: login_User,
            recevieMassUserId: massagesRe,
            senderName: companyName,
            sender: login_User,
            time: timestamp,
          },
        ]);
      } else if (receivedMessage != null) {
        setMessages([
          ...massages,
          {
            item: newMessage,
            type: massageType,
            loginUser: login_User,
            recevieMassUserId: massagesRe,
            senderName: companyName,
            sender: login_User,
            time: timestamp,
          },
        ]);
      }

      setNewMessage("");
      searchChat?.map((chat) => {
        if (chat?._id == activeMessageBox?._id) {
          chat?.users.map((item) => {
            if (item.companyId !== login_User) {
              receiverId = item.companyId;
            }
          });
        }
      });

      searchChat?.map((chat) => {
        if (chat?._id == activeMessageBox?._id) {
          chat?.users.map((item) => {
            if (
              item.companyId !== login_User &&
              item.companyId !== receiverId
            ) {
              receiverId2 = item.companyId;
            }
          });
        }
      });

      let chatId = activeMessageBox?._id;
      setsendMassages({
        newMessage,
        receiverId,
        receiverId2,
        chatId,
        massageType,
        loginUser: login_User,
        recevieMassUserId: massagesRe,
        sender: login_User,
        senderName: companyName,
        time: timestamp,
      });
    }
  };

  let notificationSenderId = "";
  searchChat?.map((chat) => {
    if (chat?._id == activeMessageBox?._id) {
      chat?.users.map((item) => {
        if (
          item.companyId !== login_User &&
          item.companyId !== "6437d9c2b16a5049913d70a1"
        ) {
          notificationSenderId = item.companyId;
        }
      });
    }
  });

  useEffect(() => {
    if (sendMassages) {
      let receiver = notificationSenderId;
      let sender = login_User;
      let message = `You have received messages from ${companyName}`;
      let type = "message";

      dispatch(notifications(receiver, sender, message, type));
    }
  }, [sendMassages]);

  // Chat User Name
  let chat_Name = "";
  let active_User_name = "";
  let login_Status = "Offline";
  let last_Seen = "";

  useEffect(() => {
    dispatch(searchChats(search));
  }, [dispatch, search]);

  useEffect(() => {
    selectedChatCompare = activeMessageBox?._id;
    dispatch(getMassages(activeMessageBox?._id));
  }, []);

  useEffect(() => {
    socket.emit("new-user-add", login_User);
    socket.on("get-users", (users) => {
      setOnlineUser(users);
    });

    socket.on("get-lastseen", (lastseen) => {
      setLastSeen(lastseen);
    });
  }, [activeMessageBox]);

  useEffect(() => {
    const handleReceiveMessageDot = (data) => {
      RecevieMessages_Dot.push(data);
      setRecevieMessagesDotNew(data);
    };
    socket.on("recieve-message-dot", handleReceiveMessageDot);
    return () => {
      socket.off("recieve-message-dot", handleReceiveMessageDot);
    };
  }, []);

  useEffect(() => {
    const getUserLastSeen = async () => {
      const filteredUsers = activeMessageBox.users.filter(
        (user) =>
          user.companyId !== "6437d9c2b16a5049913d70a1" &&
          user.companyId !== login_User
      );

      if (filteredUsers.length > 0) {
        const user = GetLastSeen.find(
          (lastSeenUser) =>
            lastSeenUser.loginUser === filteredUsers[0].companyId
        );
        if (user) {
          setYesterdayLastSeen(user.updatedAt);
          setactiveLastSeen(user.lastSeen);
        }
      }
    };

    if (
      activeMessageBox &&
      activeMessageBox.users &&
      Array.isArray(GetLastSeen)
    ) {
      getUserLastSeen();
    }
  }, [activeMessageBox, GetLastSeen, login_User]);

  // Send Massages to Socket
  useEffect(() => {
    if (sendMassages !== null) {
      socket.emit("send-message", sendMassages);
    }
  }, [sendMassages]);

  // Send chats to Socket
  useEffect(() => {
    if (sendChat !== null) {
      socket.emit("send-chat", sendChat);
    }
  }, [sendChat]);

  useEffect(() => {
    socket.on("recevie-chat", (data) => {
      data.map((item) => {
        if (item.id === login_User) {
          setRecevieChat(item.chat);
        }
      });
    });
  }, [sendChat]);

  // Receive Massages to Socket
  socket.on(
    "recieve-message",
    (data) => {
      setSendMessageUser(data.receiverId);
      setSendMessageUser1(data.receiverId2);
      setReceivedMessage({
        item: data.newMessage,
        type: data.massageType,
        loginUser: data.login_User,
        recevieMassUserId: data.recevieMassUserId,
        recevieMassUserId2: data.receiverId2,
        sender: data.sender,
        senderName: data.senderName,
        time: data.time,
      });
      setChatIdSet(data.chatId);
      setMassage_Type(data.massageType);
      setRecevieMessgaeSolve(true);
    },
    []
  );

  useEffect(() => {
    if (
      receivedMessage !== null &&
      (sendMessageUser === login_User || sendMessageUser1 === login_User) &&
      sendMessageUser !== sendMessageUser1 &&
      chatIdSet === activeMessageBox?._id &&
      RecevieMessgaeSolve == true
    ) {
      setMessages([...massages, receivedMessage]);
      setRecevieMessgaeSolve(false);
    }
  }, [receivedMessage]);

  useEffect(() => {
    if (
      receivedMessage !== null &&
      sendMessageUser == login_User &&
      chatIdSet === activeMessageBox?._id
    ) {
      // dispatch(searchChats(""));
    }
  }, [receivedMessage]);

  searchChat.map((item) => {
    if (item[0]) {
      setActiveMessageBox(item);
    }
    if (
      receivedMessage !== null &&
      sendMessageUser == login_User &&
      item._id === chatIdSet
    ) {
      if (!RecevieMessagesDot.some((chatIdSet) => chatIdSet === item._id)) {
        setRecevieMessagesDot([...RecevieMessagesDot, chatIdSet]);
        RecevieMessages_Dot.push(chatIdSet);
      }
    }
  });

  if (activeMessageBox) {
    RecevieMessages_Dot = RecevieMessages_Dot.filter(
      (chat) => chat.chatId !== activeMessageBox._id
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
      const myForm = new FormData();
      myForm.append("senderUserId", "642269ef97b700a5ecd3a540");
      myForm.append("recevieUserId", "64219e37d0dd5c3b49c38ba2");
      myForm.append("recevieChatId", activeMessageBox?._id);
      myForm.append("file", file);
      changeImageHandler(myForm);
    };
  };

  const changeImageHandler = async (myForm) => {
    const { data } = await axios.post("support/files", myForm, {
      headers: { "Content-type": "multipart/form-data" },
      withCredentials: true,
    });
    setNewMessage(data?.file?.fileUrl);
    setImgurl(data?.file?.fileUrl);
    setFileSet(true);
    dispatch(sendFile(myForm));
  };

  const timeFormatset = (times) => {
    const isoDate = times;
    const date = new Date(isoDate);
    const time = date.toLocaleTimeString("en-In", {
      hour: "numeric",
      minute: "2-digit",
    });
    return time;
  };

  const updateActiveLastSeen = () => {
    if (lastSeen && activeMessageBox?.users) {
      lastSeen.forEach((item) => {
        activeMessageBox.users.forEach((chat) => {
          if (chat?.companyId === item.id) {
            setactiveLastSeen(item.lastSeen);
          }
        });
      });
    }
  };

  useEffect(() => {
    updateActiveLastSeen();
  }, [activeLastSeen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: chatData } = await axios.get(
          `support/search?search=${search}`,
          {
            withCredentials: true,
          }
        );
        dispatch(getMassages(chatData[0]?._id));
        setActiveMessageBox(chatData[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function isWithinLast24Hours(date) {
    const commingDate = new Date(date);
    const options = { timeZone: "Asia/Kolkata" };
    const formattedDate = commingDate.toLocaleString("en-IN", options);

    const now = Date.now();
    const diff = now - commingDate.getTime();
    const millisecondsInDay = 24 * 60 * 60 * 1000;

    return diff < millisecondsInDay;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMessage(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          width: "90%",
          mx: "auto",
        }}
      >
        <Breadcrumbs
          title="Messages"
          subtitle="Messages"
          breadCrumb={[
            { title: "Message", link: "/message" },
            { title: "Message", link: "/message" },
          ]}
          MainText={"Messages"}
        />

        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            bgcolor: "transparent",
            border: "none",
            boxShadow: "none",
          }}
        >
          <Box sx={MessageUserViewStyle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <Typography sx={MessageTitle}>Messages</Typography>
              <input
                value={search}
                name="search"
                type={"text"}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                style={UserMessageSearchBox}
                placeholder="Search"
              />
            </Box>

            {searchChat &&
              searchChat.length > 0 &&
              searchChat?.map((item, idx) => {
                return (
                  <>
                    {loadingMessage ? (
                      <Box
                        sx={{
                          width: "95%",
                          display: "flex",
                          gap: "10px",
                          flexWrap: "nowrap",
                          mx: "auto",
                          mt: 2,
                          alignItems: "center",
                        }}
                      >
                        <Skeleton
                          variant="circular"
                          sx={{ width: "40px", height: "40px" }}
                        />
                        <Skeleton
                          variant="rectangular"
                          height={40}
                          sx={{ width: "100%" }}
                        />
                      </Box>
                    ) : (
                      <Box
                        onClick={() => {
                          setActiveMessageBox(item);
                          all_Massages(item?._id);
                          setNewMessage("");
                        }}
                        sx={{
                          ...UserNameBox,
                          bgcolor:
                            item._id === activeMessageBox?._id
                              ? "#445FD2"
                              : "#fff",
                          cursor: "pointer",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "20px",
                            // bgcolor: "red",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {searchChat.map((chat) => {
                              return RecevieMessages_Dot.map((chats) => {
                                if (
                                  chat._id === chats.chatId &&
                                  item._id === chats.chatId
                                ) {
                                  return (
                                    <Box
                                      sx={{
                                        width: "11px",
                                        height: "11px",
                                        borderRadius: "50%",
                                        ml: 1,
                                        mr: 1,
                                        background: "blue",
                                        overflow: "scroll",
                                      }}
                                    ></Box>
                                  );
                                }
                              });
                            })}

                            {item?.users?.map((users) => {
                              if (
                                login_User !== users?.companyId &&
                                users?.companyId !== "6437d9c2b16a5049913d70a1"
                              ) {
                                chat_Name = users.name;
                              }
                            })}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                              }}
                            >
                              <CompanyNameAvatar CompanyName={chat_Name} />
                              <Box>
                                <Typography
                                  sx={{
                                    ...UserNameText,
                                    color:
                                      item._id === activeMessageBox?._id
                                        ? "#ffffff"
                                        : "#6B7A99",
                                    // make text hide when it is too long
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    maxWidth: "180px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: "5px",
                                    alignItems: "center",
                                  }}
                                >
                                  {chat_Name}
                                </Typography>

                                {item?.latestMessage?.content.includes(
                                  "https://bxi-development.s3.amazonaws.com/"
                                ) ? (
                                  <Typography
                                    sx={{
                                      ...UserNameText,
                                      fontSize: "12px",
                                      lineHeight: "20px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      maxWidth: "180px",
                                      bgcolor: "transparent",
                                      color:
                                        item._id === activeMessageBox?._id
                                          ? "rgba(247, 247, 255, 0.6);"
                                          : "rgba(60, 60, 67, 0.6)",
                                    }}
                                  >
                                    Image
                                  </Typography>
                                ) : (
                                  <Typography
                                    sx={{
                                      ...UserNameText,
                                      fontSize: "12px",
                                      lineHeight: "20px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      maxWidth: "180px",
                                      // bgcolor: "green",
                                      color:
                                        item._id === activeMessageBox?._id
                                          ? "rgba(247, 247, 255, 0.6);"
                                          : "rgba(60, 60, 67, 0.6)",
                                    }}
                                  >
                                    {item?.latestMessage?.content}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </Box>
                          <Typography
                            sx={{
                              ...UserNameText,
                              fontSize: "12px",
                              lineHeight: "20px",
                              color:
                                item._id === activeMessageBox?._id
                                  ? "rgba(247, 247, 255, 0.6);"
                                  : "rgba(60, 60, 67, 0.6)",
                            }}
                          >
                            {format(item?.latestMessage?.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </>
                );
              })}
          </Box>
          <Box sx={MessageViewStyle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  borderBottom: "1px solid #E5E5E5",
                  width: "90%",
                  py: "15px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {activeMessageBox?.users?.map((user) => {
                    if (
                      user.companyId !== "6437d9c2b16a5049913d70a1" &&
                      login_User !== user?.companyId
                    ) {
                      return (
                        <CompanyNameAvatar
                          MainAvatar={true}
                          CompanyName={user?.name}
                        />
                      );
                    }
                  })}
                  <Box>
                    <Typography
                      sx={{
                        ...UserNameText,
                        color: "#000000",
                      }}
                    >
                      {activeMessageBox?.users?.map((user) => {
                        if (
                          login_User !== user?.companyId &&
                          user?.companyId !== "6437d9c2b16a5049913d70a1"
                        ) {
                          active_User_name = user.name;
                        }
                      })}
                      {active_User_name}
                    </Typography>
                    <Typography
                      sx={{
                        ...UserNameText,
                        fontSize: "12px",
                        lineHeight: "20px",
                        color: "rgba(60, 60, 67, 0.6)",
                      }}
                    >
                      {activeMessageBox &&
                        activeMessageBox?.users?.map((chat) => {
                          onlineUser?.map((user) => {
                            if (
                              user?.username !== login_User &&
                              user?.username === chat?.companyId
                            ) {
                              login_Status = "Online";
                            }
                          });
                        })}

                      {login_Status === "Offline"
                        ? isWithinLast24Hours(yesterdayLastSeen)
                          ? `Last seen at ${activeLastSeen}`
                          : `Last seen at ${activeLastSeen}`
                        : login_Status}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <ReactScrollToBottom
              style={{
                borderRadius: "20px",
                height: "50%",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  minHeight: "66vh",
                  maxHeight: "66vh",
                  px: "40px",
                  py: "1px",
                  mb: 2,
                }}
              >
                {searchChat.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        color: "#8A8A8A",
                        lineHeight: 25,
                      }}
                    >
                      No Data Found
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {massages &&
                      massages.length > 0 &&
                      massages?.map((item, idx) => {
                        console.log("searchChat======>", searchChat);
                        return (
                          // do message skeleton code here+
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              alignItems:
                                login_User === item.sender
                                  ? "flex-end"
                                  : "flex-start",
                              marginBottom: "10px",
                            }}
                          >
                            {item.type === "text" ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: "17px",
                                  flexDirection:
                                    login_User === item.sender
                                      ? "row-reverse"
                                      : "row",
                                  justifyContent: "flex-start",
                                  alignItems: "flex-end",
                                }}
                              >
                                <CompanyNameAvatar
                                  CompanyName={item.senderName}
                                />
                                <span
                                  style={{
                                    display: "inline-block",
                                    maxWidth: "60%",
                                    borderRadius: "20px",
                                    padding: "10px",
                                    backgroundColor:
                                      login_User === item.sender
                                        ? "#445FD2"
                                        : item.senderName === "BXI Admin"
                                        ? "#ccd0fe"
                                        : "#F3F6F9",
                                    color:
                                      login_User === item.sender
                                        ? "#ffffff"
                                        : "black",
                                    fontFamily: "Poppins",
                                    fontSize: "15px",
                                    fontWeight: "400",
                                    marginBottom: "20px",
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      wordWrap: "break-word",
                                      overflowWrap: "break-word",
                                    }}
                                  >
                                    {item.item}
                                  </div>
                                  <Typography>
                                    {timeFormatset(item.time)}
                                  </Typography>

                                  {login_User === item.sender ? (
                                    <span
                                      style={{
                                        position: "absolute",
                                        bottom: "-13px",
                                        right: "-14px",
                                        zIndex: "1",
                                        transform: "translate(-10px, -10px)",
                                      }}
                                    >
                                      <img
                                        src={BlueTail}
                                        width={"18px"}
                                        height={"auto "}
                                        alt=""
                                      />
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        position: "absolute",
                                        bottom: "-16px",
                                        left: "06px",
                                        zIndex: "1",
                                        transform: "translate(-10px, -10px)",
                                      }}
                                    >
                                      <img
                                        src={GrayTail}
                                        width={"18px"}
                                        height={"auto"}
                                        alt=""
                                      />
                                    </span>
                                  )}
                                </span>
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: "10px",
                                  flexDirection:
                                    login_User === item.sender
                                      ? "row-reverse"
                                      : "row",
                                }}
                              >
                                <CompanyNameAvatar
                                  CompanyName={item.senderName}
                                />
                                <img
                                  onClick={() => {
                                    setImgUrlforview(item.item);
                                    setIsOpen(true);
                                  }}
                                  style={{
                                    borderRadius: "20px",
                                    maxWidth: "70%",
                                    textAlign:
                                      login_User === item.sender
                                        ? "right"
                                        : "left",
                                    backgroundColor:
                                      login_User === item.sender
                                        ? "#445FD2"
                                        : " #f1f0f0",
                                    height: "220px",
                                    width: "220px",
                                  }}
                                  src={item.item}
                                  alt={item.alt}
                                />
                              </Box>
                            )}
                          </div>
                        );
                      })}
                  </>
                )}
              </Box>

              <Dialog
                maxWidth="sm"
                open={isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <img src={imgUrlforview} alt="item" onClick={handleClose} />
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{
                    textTransform: "none",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                  }}
                >
                  Close
                </Button>
              </Dialog>

              <Dialog
                maxWidth="xs"
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                sx={{
                  "& .MuiDialog-paper": {
                    minHeight: "90px",
                    minWidth: "200px",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    mt: 1,
                    ml: "auto",
                    mr: "auto",
                  }}
                >
                  {textInputMessages}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{
                    textTransform: "none",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    ml: "auto",
                    mr: "auto",
                    width: "50px",
                    mt: 1,
                  }}
                >
                  Close
                </Button>
              </Dialog>
            </ReactScrollToBottom>
            <Box
              sx={{
                width: "95%",
                maxWidth: "700px",
                border: "1px solid #E6E9EE",
                maxHeight: "80px",
                minxHeight: "40px",
                height: "auto",
                overflow: "scroll",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: "10px",
                mx: "auto",
                mt: 2,
                background: "#fff",
              }}
            >
              {imgurl === "" ? null : (
                <Box
                  component="img"
                  src={imgurl}
                  alt="image"
                  sx={{
                    height: "40px",
                    width: "40px",
                  }}
                />
              )}
              <Box
                sx={{
                  width: "90%",
                  position: "relative",
                }}
              >
                {newMessage.includes("https") ? (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "50px",
                      left: "0px",
                      height: "100px",
                      width: "100px",
                      backgroundImage: `url(${
                        newMessage.includes("https") ? newMessage : null
                      })`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                ) : null}

                <InputEmoji
                  value={newMessage}
                  onChange={setNewMessage}
                  onEnter={newMessage == "" ? null : send_Massages}
                  placeholder="Message..."
                  borderRadius={10}
                  fontSize={newMessage?.includes("https") ? 0 : 15}
                  borderColor="#fff"
                  style={{ marginRight: "10px" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "10%",
                  gap: "9px",
                }}
              >
                <button
                  style={{
                    padding: "0px",
                    margin: 0,
                    display: "flex",
                    border: "none",
                    background: "transparent",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <label htmlFor="file-input">
                    <img
                      src={GalleryIcon}
                      width={"22px"}
                      alt="gallery"
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                </button>

                <button
                  onClick={newMessage == "" ? null : send_Massages}
                  style={{
                    padding: "5px",
                    margin: 0,
                    display: "flex",
                    border: "none",
                    background: "transparent",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <img src={SendIcon} width={"24px"} />
                </button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Paper>
    </>
  );
};

export default Message;

const CompanyNameAvatar = (props) => {
  console.log("props.MainAvatar", props.MainAvatar);
  let comname = "";
  let comnametwo = "";
  let width = props.MainAvatar ? "65px" : "45px";
  let height = props.MainAvatar ? "65px" : "45px";

  let data = props.CompanyName
    ? props.CompanyName?.split(" ")
    : "Company Name".split(" ");

  let datatwo = data && data?.map((word) => word[0]);
  comname = datatwo[0] && datatwo[0].toLowerCase();
  let datathree = (datatwo[0] && datatwo[0]) + datatwo[1];
  comnametwo = datathree;

  if (
    comname === "a" ||
    comname === "d" ||
    comname === "g" ||
    comname === "j" ||
    comname === "m" ||
    comname === "p" ||
    comname === "s" ||
    comname === "v" ||
    comname === "y" ||
    comname === "z"
  ) {
    return (
      <Avatar sx={{ bgcolor: "#445FD2", width: width, height: height }}>
        {comnametwo}
      </Avatar>
    );
  } else if (
    comname === "b" ||
    comname === "e" ||
    comname === "h" ||
    comname === "k" ||
    comname === "n" ||
    comname === "q" ||
    comname === "t" ||
    comname === "w" ||
    comname === "x"
  ) {
    return (
      <Avatar sx={{ bgcolor: "blue", width: width, height: height }}>
        {comnametwo}
      </Avatar>
    );
  } else if (
    comname === "c" ||
    comname === "f" ||
    comname === "i" ||
    comname === "l" ||
    comname === "o" ||
    comname === "r" ||
    comname === "u"
  ) {
    {
      return (
        <Avatar sx={{ bgcolor: "maroon", width: width, height: height }}>
          {comnametwo}
        </Avatar>
      );
    }
  } else {
    return (
      <Avatar sx={{ bgcolor: "orange", width: width, height: height }}>
        {comnametwo}
      </Avatar>
    );
  }
};

const CompanyTypeNameStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "18px",
  color: "#AFAFAF",
};

const MessageUserViewStyle = {
  width: "100%",
  maxWidth: "378px",
  height: "680px",
  background: "#fff",
  borderRadius: "10px",
  overflow: "scroll",
};

const MessageViewStyle = {
  width: "100%",
  py: "5px",
  maxWidth: "800px",
  height: "670px",
  background: "#fff",
  borderRadius: "10px",
};

const UserMessageSearchBox = {
  width: "107px",
  height: "42px",
  border: "1px solid #E6E9EE",
  borderRadius: "20px",
  textAlign: "center",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "21px",
  color: "#929EAE",
};

const MessageTitle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "22px",
  lineHeight: "33px",

  color: "#15223C",
};

const UserNameBox = {
  height: "76px",
  width: "378px",
  borderRadius: "0px",
  background: "#445FD2",
};

const UserNameText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: "22px",
  marginLeft: "10px",
  color: "#FFFFFF",
};
