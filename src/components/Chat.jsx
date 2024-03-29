import React, { useEffect, useState, useContext, useRef } from "react";
import { BaseUrl } from "../BaseUrl";
import { AiOutlineLink, AiOutlineSend } from "react-icons/ai";
import { ChatHeader } from "./Header";
import Footer from "./Footer";
import { BsArrowUp } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import $ from "jquery";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Global from "../context/Global";
import Ring from "./ring01.mp3";
import { ToastContainer, toast } from "react-toastify";
import { FiArrowLeft } from 'react-icons/fi'
import {
  ChatItem,
  MessageBox,
  Avatar,
  Input,
  Button,
} from "react-chat-elements";
import "react-chat-elements/dist/main.css";

import { message, noUserPic } from "./images";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import VideoPreview from "./VideoPreview";
import { FaRegFilePdf } from "react-icons/fa";

const Chat = () => {
  const contextData = useContext(Global);
  const [cookies] = useCookies();
  const [chatsUserTitle, setChatsUserTitle] = useState({
    userPic: noUserPic,
    userSelected: "No chat selected",
  });
  const navigate = useNavigate();
  const [isRender, setIsRender] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const [isSearchUserFound, IsSearchUserFound] = useState(false);
  const [allChatUser, setAllChatUser] = useState("");
  const [chatListData, setChatListData] = useState([]);
  const [remmenPage, setRemmenPage] = useState(0);
  const [wskt, setWskt] = useState();
  const [dataChange, setDataChange] = useState();
  const [otherUserId, setOtherUserId] = useState(0);
  const topMessageRef = useRef(null);
  const noOnetopMessageRef = useRef(null);
  const [curChatID, setCurChatID] = useState();
  const [chatPageId, setChatPageId] = useState({
    page: 1,
    page_size: 20,
  });
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        setIsRender(true);
      } else {
        if (cookies?.user_data.role === "professional") {
          navigate("/categoryArchitecture");
        } else {
          navigate("/client-architechture");
        }
      }
    } else {
      navigate("/select-sign-in");
    }
    if (topMessageRef?.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setChatPageId({
                page: chatPageId + 1,
                page_size: 20,
              });
            }
          });
        },
        { rootMargin: "0px", threshold: 1 }
      );
      observer.observe(topMessageRef.current);
      return () => {
        observer.unobserve(topMessageRef.current);
      };
    }
  }, [topMessageRef]);

  const searchInput = () => {
    $(".search__submit").attr("type", "submit");
  };

  const [messageInput, setMessageInput] = useState("");

  const messageEndRef = useRef();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  });

  const [currentActiveChatPane, setCurrentActiveChatPane] = useState("zero");

  const [searchPara, setSearchPara] = useState("");
  const [chatsearchfullnamedata, setChatsearchfullnamedata] = useState({
    first_name: "",
    last_name: "",
  });
  useEffect(() => {
    const searchname = searchPara.split(" ");
    setChatsearchfullnamedata({
      first_name: searchname[0],
      last_name: searchname[1] === undefined ? "" : searchname[1],
    });
  }, [searchPara]);

  const allChatUserUpdate = () => {
    if (cookies?.user_data?.role === "professional") {
      cookies?.user_data &&
        axios
          .post(`${BaseUrl}/chat/all_chat_user/`, {
            professional_id: cookies?.user_data?.user_id,
            role: cookies?.user_data?.role,
            user_token: cookies?.user_data?.user_token,
          })
          .then((res) => {
            setAllChatUser(res?.data?.data?.clients_list);
            setSearchState(false);
          });
    } else {
      cookies?.user_data &&
        axios
          .post(`${BaseUrl}/chat/all_chat_user/`, {
            client_id: cookies?.user_data?.user_id,
            role: cookies?.user_data?.role,
            user_token: cookies?.user_data?.user_token,
          })
          .then((res) => {
            setAllChatUser(res?.data?.data?.professional_list);
            setSearchState(false);
          });
    }
  };
  useEffect(() => {
    if (cookies?.user_data?.role === "professional") {
      cookies?.user_data &&
        axios
          .post(`${BaseUrl}/chat/all_chat_user/`, {
            professional_id: cookies?.user_data?.user_id,
            role: cookies?.user_data?.role,
            user_token: cookies?.user_data?.user_token,
          })
          .then((res) => {
            if (res?.data?.status === "Success") {
              setAllChatUser(res?.data?.data?.clients_list);
              axios
                .post(`${BaseUrl}/chat/get_room_id/`, {
                  professional_id: cookies?.user_data?.user_id,
                  user_token: cookies?.user_data?.user_token,
                  role: "professional",
                  client_id:
                    res?.data?.data?.clients_list[otherUserId]?.client_id,
                })
                .then((response) => {
                  var ws = new WebSocket(
                    `ws://13.52.16.160:8082/ws/chat_consumer/${response?.data?.data?.room_uuid}/`
                  );
                  setWskt(ws && ws);
                });
            }
          });
    } else {
      cookies?.user_data &&
        axios
          .post(`${BaseUrl}/chat/all_chat_user/`, {
            client_id: cookies?.user_data?.user_id,
            role: cookies?.user_data?.role,
            user_token: cookies?.user_data?.user_token,
          })
          .then((res) => {
            if (res?.data?.status === "Success") {
              setAllChatUser(res?.data?.data?.professional_list);
              axios
                .post(`${BaseUrl}/chat/get_room_id/`, {
                  client_id: cookies?.user_data?.user_id,
                  role: cookies?.user_data?.role,
                  user_token: cookies?.user_data?.user_token,
                  professional_id:
                    res?.data?.data?.professional_list[otherUserId]
                      ?.professional_id,
                })
                .then((respo) => {
                  var ws = new WebSocket(
                    `ws://13.52.16.160:8082/ws/chat_consumer/${respo?.data?.data?.room_uuid}/`
                  );
                  setWskt(ws && ws);
                });
            }
          });
    }
  }, [cookies?.user_data, otherUserId]);

  if (wskt) {
    wskt.onmessage = function (event) {
      var data = JSON.parse(event.data);
      setDataChange(data.message);
      setTimeout(() => {
        getAllMessageFromCurrentUser(curChatID);
      }, 1000);
    };
  }

  const chatUserSearchSubmit = () => {
    if (chatsearchfullnamedata.first_name === "") {
      IsSearchUserFound(false);
    } else if (chatsearchfullnamedata.first_name) {
      axios
        .post(`${BaseUrl}/chat/search_profile_chat/`, {
          user_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          role: cookies?.user_data?.role,
          first_name: chatsearchfullnamedata.first_name,
          last_name: chatsearchfullnamedata.last_name,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            setSearchState(true);
            if (cookies?.user_data?.role === "professional") {
              if (res.data.data.client_list != "No result Found") {
                setAllChatUser(res?.data?.data?.client_list);
                IsSearchUserFound(true);
              }
              if (res.data.data.client_list == "No result Found") {
                IsSearchUserFound(false);
              }
            }
            if (cookies?.user_data?.role === "client") {
              if (res.data.data.professional_list != "No result Found") {
                setAllChatUser(res?.data?.data?.professional_list);
                IsSearchUserFound(true);
              }
              if (res.data.data.professional_list == "No result Found") {
                IsSearchUserFound(false);
              }
            }
          }
        });
    }
  };
  useEffect(() => {
    if (!searchPara) {
      allChatUserUpdate();
    }
  }, [searchPara]);

  const [sendFile, setSendFile] = useState("");
  const [filePreview, setFilePreview] = useState();
  const [MsgType, setMsgType] = useState();
  const handleDelete = () => {
    setSendFile("");
    setFilePreview("");
    setMsgType("");
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSendFile(file);

    const reader = new FileReader();
    setMsgType(file?.type.split("/")[0]);
    if (file.type.startsWith("image/")) {
      reader.readAsDataURL(file);
      reader.onload = function () {
        const base64String = reader.result;
        setFilePreview(base64String);
      };
    }
  };
  const fileSendContaroller = (event) => {
    event.preventDefault();
    const fileUpload = new FormData();
    fileUpload.append("attachment", sendFile);

    if (cookies?.user_data.role === "professional") {
      fileUpload.append("professional_id", cookies?.user_data?.user_id);
    } else {
      fileUpload.append("client_id", cookies?.user_data.user_id);
    }
    fileUpload.append("role", cookies?.user_data.role);
    fileUpload.append("user_token", cookies?.user_data.user_token);

    if (cookies?.user_data.role === "professional") {
      fileUpload.append("client_id", allChatUser[otherUserId]?.client_id);
    } else {
      fileUpload.append(
        "professional_id",
        allChatUser[otherUserId]?.professional_id
      );
    }
    axios.post(`${BaseUrl}/chat/upload_file/`, fileUpload).then((res) => {
      if (res?.data?.status === "Success") {
        wskt.send(
          JSON.stringify({
            message: res?.data?.data?.file_path,
            attachment_id: res?.data?.data?.attchment_id,
            sender: cookies?.user_data?.role,
            type: "file",
          })
        );
        new Audio(Ring).play();
      }
    });
    handleDelete();
    event.target.value = "";
  };

  const fetchRemenChat = () => {
    if (cookies?.user_data?.role === "professional") {
      cookies?.user_data &&
        axios
          .post(`${BaseUrl}/chat/all_chat_user/`, {
            professional_id: cookies?.user_data?.user_id,
            role: cookies?.user_data?.role,
            user_token: cookies?.user_data?.user_token,
          })
          .then((res) => {
            if (res?.data?.status === "Success") {
              setAllChatUser(res?.data?.data?.clients_list);
              axios
                .post(`${BaseUrl}/chat/get_room_id/`, {
                  professional_id: cookies?.user_data?.user_id,
                  user_token: cookies?.user_data?.user_token,
                  role: "professional",
                  client_id:
                    res?.data?.data?.clients_list[otherUserId]?.client_id,
                })
                .then((response) => {
                  var ws = new WebSocket(
                    `ws://13.52.16.160:8082/ws/chat_consumer/${response?.data?.data?.room_uuid}/`
                  );
                  setWskt(ws && ws);
                });
              axios
                .post(`${BaseUrl}/chat/all_chats/`, {
                  professional_id: cookies?.user_data?.user_id,
                  user_token: cookies?.user_data?.user_token,
                  role: "professional",
                  client_id:
                    res?.data?.data?.clients_list[otherUserId]?.client_id,
                  page: 1,
                  page_size:
                    remmenPage > 20
                      ? chatPageId.page_size + 20
                      : chatPageId.page_size + remmenPage,
                })
                .then((respo) => {
                  setChatListData(respo?.data?.data?.messages.reverse());
                  setRemmenPage(respo?.data?.data?.data_remaining);
                  setChatPageId({
                    page: chatPageId.page,
                    page_size:
                      remmenPage > 20
                        ? chatPageId.page_size + 20
                        : chatPageId.page_size + remmenPage,
                  });
                });
            }
          });
    } else {
      cookies?.user_data &&
        axios
          .post(`${BaseUrl}/chat/all_chat_user/`, {
            client_id: cookies?.user_data?.user_id,
            role: cookies?.user_data?.role,
            user_token: cookies?.user_data?.user_token,
          })
          .then((res) => {
            if (res?.data?.status === "Success") {
              setAllChatUser(res?.data?.data?.professional_list);
              axios
                .post(`${BaseUrl}/chat/get_room_id/`, {
                  client_id: cookies?.user_data?.user_id,
                  role: cookies?.user_data?.role,
                  user_token: cookies?.user_data?.user_token,
                  professional_id:
                    res?.data?.data?.professional_list[otherUserId]
                      ?.professional_id,
                })
                .then((respo) => {
                  var ws = new WebSocket(
                    `ws://13.52.16.160:8082/ws/chat_consumer/${respo?.data?.data?.room_uuid}/`
                  );
                  setWskt(ws && ws);
                });
              axios
                .post(`${BaseUrl}/chat/all_chats/`, {
                  client_id: cookies?.user_data?.user_id,
                  role: cookies?.user_data?.role,
                  user_token: cookies?.user_data?.user_token,
                  professional_id:
                    res?.data?.data?.professional_list[otherUserId]
                      ?.professional_id,
                  page: chatPageId.page,
                  page_size:
                    remmenPage > 20
                      ? chatPageId.page_size + 20
                      : chatPageId.page_size + remmenPage,
                })
                .then((response) => {
                  setChatListData(response?.data?.data?.messages.reverse());
                  setRemmenPage(response?.data?.data?.data_remaining);
                  setChatPageId({
                    page: chatPageId.page,
                    page_size:
                      remmenPage > 20
                        ? chatPageId.page_size + 20
                        : chatPageId.page_size + remmenPage,
                  });
                });
            }
          });
    }
  };

  const getRoomId = (data) => {
    if (cookies?.user_data?.role === "client") {
      axios
        .post(`${BaseUrl}/chat/get_room_id/`, {
          client_id: cookies?.user_data.user_id,
          user_token: cookies?.user_data.user_token,
          role: "professional",
          professional_id: data?.professional_id,
        })
        .then((res) => {
          if (res.data.status === "Success") {
            setSearchState(false);
            setSearchPara("");
          }
        });
    } else {
      axios
        .post(`${BaseUrl}/chat/get_room_id/`, {
          client_id: data?.client_id,
          user_token: cookies?.user_data.user_token,
          role: "professional",
          professional_id: cookies?.user_data.user_id,
        })
        .then((res) => {
          if (res.data.status === "Success") {
            setSearchState(false);
            setSearchPara("");
          }
        });
    }
  };

  // get all chat message
  function getAllMessageFromCurrentUser(userID) {
    if (cookies?.user_data?.role === "professional") {
      axios
        .post(`${BaseUrl}/chat/all_chats/`, {
          professional_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          role: "professional",
          client_id: userID,
          page: chatPageId.page,
          page_size: chatPageId.page_size,
        })
        .then((respo) => {
          setChatListData(respo?.data?.data?.messages.reverse());
          setRemmenPage(respo?.data?.data?.data_remaining);
        });
    } else {
      axios
        .post(`${BaseUrl}/chat/all_chats/`, {
          client_id: cookies?.user_data?.user_id,
          role: cookies?.user_data?.role,
          user_token: cookies?.user_data?.user_token,
          professional_id: userID,
          page: chatPageId.page,
          page_size: chatPageId.page_size,
        })
        .then((response) => {
          setChatListData(response?.data?.data?.messages.reverse());
          setRemmenPage(response?.data?.data?.data_remaining);
        });
    }
  }

  const sendMessage = (event) => {
    event.preventDefault();
    if (messageInput.trim()) {
      wskt.send(
        JSON.stringify({
          message: messageInput,
          sender: cookies?.user_data?.role,
          type: "message",
        })
      );
      setMessageInput("");
      setTimeout(() => {
        getAllMessageFromCurrentUser(curChatID);
      }, 1000);
      // new Audio(Ring).play();
    }
  };
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (chatsUserTitle.userSelected !== "No chat selected") {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [chatsUserTitle.userSelected])
  return isRender ? (
    <>
      <ChatHeader />
      <section className="chatbox mb-2">
        <div className="container">
          <div className="row chats-header theme-bg-color" style={{ maxHeight: "inherit" }} >
            <div className="isMobile">
              {
                !isMobile ? <form onSubmit={(e) => e.preventDefault()} className="search d-flex p-2 align-items-center" >
                  <input className="search__input" type="search" placeholder="Search" value={searchPara} id="searchInput" onChange={(e) => {
                    searchInput();
                    setSearchPara(e.target.value);
                  }} style={{ width: '100%' }} />
                  <button className="search__submit d-flex justify-content-center align-items-center"
                    type="button" aria-label="Search" onClick={chatUserSearchSubmit} >
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </form> :
                  <div className="d-flex align-items-center">
                    <button className="btn" style={{ fontSize: '25px', color: '#fff' }} onClick={() => {
                      setChatsUserTitle({
                        userPic: noUserPic,
                        userSelected: "No chat selected",
                      })
                    }}> <FiArrowLeft /></button>
                    <div className="col-md-12 col-12 d-flex isMobile align-items-center" style={{ minHeight: "61px" }} >
                      <Avatar src={chatsUserTitle.userPic} alt={"avatar"} size="large" type="rounded-circle" />
                      <div className="ms-3 userChatName" style={{ textTransform: "capitalize " }} >
                        {chatsUserTitle.userSelected}
                      </div>
                    </div>
                  </div>
              }
            </div>

            <div className="col-md-3 col-4 align-items-center justify-content-between isDesktop border-end bl-chat">
              <form onSubmit={(e) => e.preventDefault()} className="search d-flex align-items-center" >
                <input className="search__input" type="search" placeholder="Search" value={searchPara} id="searchInput" onChange={(e) => {
                  searchInput();
                  setSearchPara(e.target.value);
                }} />
                <button
                  className="search__submit d-flex justify-content-center align-items-center"
                  type="button"
                  aria-label="Search"
                  onClick={chatUserSearchSubmit}
                >
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
            </div>

            <div className="col-md-9 col-8 isDesktop align-items-center p-2" style={{ minHeight: "61px" }} >
              <Avatar src={chatsUserTitle.userPic} alt={"avatar"} size="large" type="rounded-circle" />
              <div className="ms-3 userChatName" style={{ textTransform: "capitalize " }} >
                {chatsUserTitle.userSelected}
              </div>
            </div>

          </div>
          <Tab.Container id="left-tabs-example" activeKey={currentActiveChatPane} >
            <Row className="chats-main isMobile" style={{ maxHeight: "100% " }}>
              <Col
                sm={isMobile ? 0 : 12}
                md={isMobile ? 0 : 12}

                xxl={3}
                xl={3}
                lg={3}
                id="chatusersdisplaybox"
                className={isMobile ? "d-none p-0" : 'd-block p-0'}
                style={{
                  height: `${parseInt($(".chatbox").height()) - 61}px`,
                  overflowY: "auto",
                  backgroundColor: " gainsboro",
                }}
              >
                {!searchState ? (
                  <Nav variant="pills" className="flex-column">
                    {allChatUser &&
                      allChatUser
                        ?.filter((data) =>
                          data?.name
                            ?.toLowerCase()
                            ?.includes(searchPara.toLowerCase())
                        )
                        ?.map((data, index) => {
                          return (
                            <>
                              {data?.name ? (
                                <ChatItem
                                  key={index}
                                  avatar={
                                    data?.avatar ? data?.avatar : noUserPic
                                  }
                                  alt={data?.alt}
                                  title={`${data?.name?.slice(0, 15)}${data?.name?.length <= 15 ? "" : "..."
                                    }`}
                                  subtitle={`${data?.last_msg?.slice(0, 15)}${data?.last_msg?.length <= 15 ? "" : "..."
                                    }`}
                                  unread={data?.last_msg}
                                  onClick={() => {
                                    setCurrentActiveChatPane("first");
                                    setChatsUserTitle({
                                      userPic: data?.avatar
                                        ? data?.avatar
                                        : noUserPic,
                                      userSelected: data?.name,
                                    });
                                    setOtherUserId(index);
                                    getAllMessageFromCurrentUser(
                                      data?.client_id
                                        ? data?.client_id
                                        : data?.professional_id
                                    );
                                    setCurChatID(
                                      data?.client_id
                                        ? data?.client_id
                                        : data?.professional_id
                                    );
                                  }}
                                />
                              ) : (
                                <h1 style={{ color: "white" }}>Hello</h1>
                              )}
                            </>
                          );
                        })}
                  </Nav>
                ) : (
                  <Nav variant="pills" className="flex-column">
                    {allChatUser &&
                      allChatUser
                        ?.filter((data) =>
                          data?.name
                            ?.toLowerCase()
                            ?.includes(searchPara.toLowerCase())
                        )
                        .map((data, index) => (
                          <>
                            {data?.name ? (
                              <ChatItem
                                key={index}
                                avatar={data?.avatar ? data?.avatar : noUserPic}
                                title={`${data?.name?.slice(0, 15)}${data?.name?.length <= 15 ? "" : "..."
                                  }`}
                                onClick={() => getRoomId(data)}
                              />
                            ) : (
                              <h1 style={{ color: "white" }}>Hello</h1>
                            )}
                          </>
                        ))}
                  </Nav>
                )}
              </Col>

              <Col
                sm={isMobile ? 12 : 0}
                md={isMobile ? 12 : 0}
                xxl={9}
                xl={9}
                lg={9}
                className={!isMobile ? "d-none p-0" : 'd-block p-0'}
                id="chatsdisplaybox"
                style={{
                  height: `${parseInt($(".chatbox").height()) - 61}px`,
                  backgroundColor: "#c7c7c7",
                  overflowY: "auto",
                  position: "relative",
                }}
              >
                {currentActiveChatPane !== "first" ? (
                  ""
                ) : (
                  <Tab.Content>
                    <div
                      id="chat-log"
                      className={"tab-content d-flex flex-column w-100 pt-2"}
                      style={{ position: " absolute", top: "0px", bottom: 0 }}
                    >
                      <div className="chat-box d-flex flex-column">
                        {remmenPage > 0 && (
                          <div className="fetchMore">
                            <button
                              className="btn btn-success"
                              onClick={fetchRemenChat}
                            >
                              <BsArrowUp /> More
                            </button>
                          </div>
                        )}

                        {chatListData &&
                          chatListData.map((message, index) =>
                            message?.type === "text" ? (
                              <div>
                                <MessageBox
                                  date={message?.timestamp}
                                  ref={
                                    index === 0
                                      ? topMessageRef
                                      : noOnetopMessageRef
                                  }
                                  key={index}
                                  title={message?.name}
                                  type={message?.type}
                                  text={message?.data}
                                  position={
                                    message?.status === "Send"
                                      ? "right"
                                      : "left"
                                  }
                                />
                              </div>
                            ) : (
                              <a download target="_blank" href={message?.data}>
                                <MessageBox
                                  date={message?.timestamp}
                                  position={
                                    message?.status === "Send"
                                      ? "right"
                                      : "left"
                                  }
                                  type={
                                    message?.data.slice(-3) == "png" ||
                                      "jpg" ||
                                      "webm"
                                      ? "photo"
                                      : message?.type
                                  }
                                  title={message?.name}
                                  text={message?.data.slice(48)}
                                  copiableDate={true}
                                  data={{
                                    uri: message?.data,
                                    status: { click: false, loading: 0 },
                                  }}
                                />
                              </a>
                            )
                          )}

                        <div ref={messageEndRef}></div>
                      </div>
                      <form
                        className="row mx-3 mb-4"
                        onSubmit={sendFile ? fileSendContaroller : sendMessage}
                      >
                        <div className="chatBoxFileSelectMainBox col-1">
                          <label
                            className="fileSelectLinkChatbox"
                            htmlFor="selectFile"
                          >
                            <AiOutlineLink
                              color="white"
                              style={{ cursor: "pointer" }}
                            />
                          </label>
                          <input
                            type="file"
                            name="file"
                            id="selectFile"
                            onChange={handleFileChange}
                          />
                        </div>
                        <div className="col-11 d-flex input-area">
                          {sendFile && (
                            <div className="previewFile">
                              <button
                                className="fileDeleteBtn btn btn-primery"
                                onClick={handleDelete}
                              >
                                <RxCross2 />
                              </button>
                              {MsgType === "image" && (
                                <img src={filePreview} alt="" />
                              )}
                              {MsgType === "video" && (
                                <VideoPreview videoFile={sendFile} />
                              )}
                              {MsgType === "application" && (
                                <div className="pdf-container">
                                  <div
                                    style={{
                                      fontSize: "200px",
                                      margin: "auto",
                                    }}
                                  >
                                    <FaRegFilePdf />
                                  </div>
                                  <p>{sendFile.name}</p>
                                </div>
                              )}
                            </div>
                          )}
                          <input
                            className="chatMessageInputText"
                            placeholder="Type here..."
                            id="chat-message"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                          />
                          <Button id="chat-submit" text={"Send"} title="Send" />
                        </div>
                      </form>
                    </div>
                  </Tab.Content>
                )}
              </Col>
            </Row>
            <Row className="chats-main isDesktopchat" style={{ maxHeight: "100% " }}>
              <Col
                xxl={3}
                xl={3}
                lg={3}
                id="chatusersdisplaybox"
                className={'p-0'}
                style={{
                  height: `${parseInt($(".chatbox").height()) - 61}px`,
                  overflowY: "auto",
                  backgroundColor: " gainsboro",
                }}
              >
                {!searchState ? (
                  <Nav variant="pills" className="flex-column">
                    {allChatUser &&
                      allChatUser
                        ?.filter((data) =>
                          data?.name
                            ?.toLowerCase()
                            ?.includes(searchPara.toLowerCase())
                        )
                        ?.map((data, index) => {
                          return (
                            <>
                              {data?.name ? (
                                <ChatItem
                                  key={index}
                                  avatar={
                                    data?.avatar ? data?.avatar : noUserPic
                                  }
                                  alt={data?.alt}
                                  title={`${data?.name?.slice(0, 15)}${data?.name?.length <= 15 ? "" : "..."
                                    }`}
                                  subtitle={`${data?.last_msg?.slice(0, 15)}${data?.last_msg?.length <= 15 ? "" : "..."
                                    }`}
                                  unread={data?.last_msg}
                                  onClick={() => {
                                    setCurrentActiveChatPane("first");
                                    setChatsUserTitle({
                                      userPic: data?.avatar
                                        ? data?.avatar
                                        : noUserPic,
                                      userSelected: data?.name,
                                    });
                                    setOtherUserId(index);
                                    getAllMessageFromCurrentUser(
                                      data?.client_id
                                        ? data?.client_id
                                        : data?.professional_id
                                    );
                                    setCurChatID(
                                      data?.client_id
                                        ? data?.client_id
                                        : data?.professional_id
                                    );
                                  }}
                                />
                              ) : (
                                <h1 style={{ color: "white" }}>Hello</h1>
                              )}
                            </>
                          );
                        })}
                  </Nav>
                ) : (
                  <Nav variant="pills" className="flex-column">
                    {allChatUser &&
                      allChatUser
                        ?.filter((data) =>
                          data?.name
                            ?.toLowerCase()
                            ?.includes(searchPara.toLowerCase())
                        )
                        .map((data, index) => (
                          <>
                            {data?.name ? (
                              <ChatItem
                                key={index}
                                avatar={data?.avatar ? data?.avatar : noUserPic}
                                title={`${data?.name?.slice(0, 15)}${data?.name?.length <= 15 ? "" : "..."
                                  }`}
                                onClick={() => getRoomId(data)}
                              />
                            ) : (
                              <h1 style={{ color: "white" }}>Hello</h1>
                            )}
                          </>
                        ))}
                  </Nav>
                )}
              </Col>

              <Col
                xxl={9}
                xl={9}
                lg={9}
                className="p-0"
                id="chatsdisplaybox"
                style={{
                  height: `${parseInt($(".chatbox").height()) - 61}px`,
                  backgroundColor: "#c7c7c7",
                  overflowY: "auto",
                  position: "relative",
                }}
              >
                {currentActiveChatPane !== "first" ? (
                  ""
                ) : (
                  <Tab.Content>
                    <div
                      id="chat-log"
                      className={"tab-content d-flex flex-column w-100 pt-2"}
                      style={{ position: " absolute", top: "0px", bottom: 0 }}
                    >
                      <div className="chat-box d-flex flex-column">
                        {remmenPage > 0 && (
                          <div className="fetchMore">
                            <button
                              className="btn btn-success"
                              onClick={fetchRemenChat}
                            >
                              <BsArrowUp /> More
                            </button>
                          </div>
                        )}

                        {chatListData &&
                          chatListData.map((message, index) =>
                            message?.type === "text" ? (
                              <div>
                                <MessageBox
                                  date={message?.timestamp}
                                  ref={
                                    index === 0
                                      ? topMessageRef
                                      : noOnetopMessageRef
                                  }
                                  key={index}
                                  title={message?.name}
                                  type={message?.type}
                                  text={message?.data}
                                  position={
                                    message?.status === "Send"
                                      ? "right"
                                      : "left"
                                  }
                                />
                              </div>
                            ) : (
                              <a download target="_blank" href={message?.data}>
                                <MessageBox
                                  date={message?.timestamp}
                                  position={
                                    message?.status === "Send"
                                      ? "right"
                                      : "left"
                                  }
                                  type={
                                    message?.data.slice(-3) == "png" ||
                                      "jpg" ||
                                      "webm"
                                      ? "photo"
                                      : message?.type
                                  }
                                  title={message?.name}
                                  text={message?.data.slice(48)}
                                  copiableDate={true}
                                  data={{
                                    uri: message?.data,
                                    status: { click: false, loading: 0 },
                                  }}
                                />
                              </a>
                            )
                          )}

                        <div ref={messageEndRef}></div>
                      </div>
                      <form
                        className="row mx-3 mb-4"
                        onSubmit={sendFile ? fileSendContaroller : sendMessage}
                      >
                        <div className="chatBoxFileSelectMainBox col-1">
                          <label
                            className="fileSelectLinkChatbox"
                            htmlFor="selectFile"
                          >
                            <AiOutlineLink
                              color="white"
                              style={{ cursor: "pointer" }}
                            />
                          </label>
                          <input
                            type="file"
                            name="file"
                            id="selectFile"
                            onChange={handleFileChange}
                          />
                        </div>
                        <div className="col-11 d-flex input-area">
                          {sendFile && (
                            <div className="previewFile">
                              <button
                                className="fileDeleteBtn btn btn-primery"
                                onClick={handleDelete}
                              >
                                <RxCross2 />
                              </button>
                              {MsgType === "image" && (
                                <img src={filePreview} alt="" />
                              )}
                              {MsgType === "video" && (
                                <VideoPreview videoFile={sendFile} />
                              )}
                              {MsgType === "application" && (
                                <div className="pdf-container">
                                  <div
                                    style={{
                                      fontSize: "200px",
                                      margin: "auto",
                                    }}
                                  >
                                    <FaRegFilePdf />
                                  </div>
                                  <p>{sendFile.name}</p>
                                </div>
                              )}
                            </div>
                          )}
                          <input
                            className="chatMessageInputText"
                            placeholder="Type here..."
                            id="chat-message"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                          />
                          <Button id="chat-submit" text={"Send"} title="Send" />
                        </div>
                      </form>
                    </div>
                  </Tab.Content>
                )}
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </section >
      <ToastContainer />
      {/* <Footer /> */}
    </>
  ) : (
    <Loader />
  );
};

export default Chat;
