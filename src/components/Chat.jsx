import React, { useEffect, useState, useContext, useRef } from "react";
import { AiOutlineLink, AiOutlineSend } from "react-icons/ai";
import { ChatHeader } from "./Header";
import Footer from "./Footer";
import $ from "jquery";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Global from "../context/Global";
import { Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
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
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const contextData = useContext(Global);
  // const isOnChatPage = () => {
  //   if (location.pathname === "/chat") {
  //     contextData.setIsOnChatPage(!contextData.isOnChatPage);
  //   }
  // };
  // useEffect(() => {
  //   if (location.pathname === "/chat") {
  //     isOnChatPage();
  //   }
  // }, []);

  const [chatsUserTitle, setChatsUserTitle] = useState({
    userPic: noUserPic,
    userSelected: "No chat selected",
  });

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
  const [searchState, setSearchState] = useState(false);
  const [isSearchUserFound, IsSearchUserFound] = useState(false);
  const [allChatUser, setAllChatUser] = useState("");
  const [chatListData, setChatListData] = useState([]);
  const [wskt, setWskt] = useState();
  const [dataChange, setDataChange] = useState();
  const [otherUserId, setOtherUserId] = useState(0);
  const [chatPageId, setChatPageId] = useState({
    page: 1,
    page_size: 20,
  });
  const allChatUserUpdate = () => {
    if (contextData?.userData?.role === "professional") {
      contextData?.userData &&
        axios
          .post("http://13.52.16.160:8082/chat/all_chat_user/", {
            professional_id: contextData?.userData?.user_id,
            role: contextData?.userData?.role,
            user_token: contextData?.userData?.user_token,
          })
          .then((res) => {
            setAllChatUser(res?.data?.data?.clients_list);
            setSearchState(false);
          });
    } else {
      contextData?.userData &&
        axios
          .post("http://13.52.16.160:8082/chat/all_chat_user/", {
            client_id: contextData?.userData?.user_id,
            role: contextData?.userData?.role,
            user_token: contextData?.userData?.user_token,
          })
          .then((res) => {
            setAllChatUser(res?.data?.data?.professional_list);
            setSearchState(false);
          });
    }
  };
  useEffect(() => {
    if (contextData?.userData?.role === "professional") {
      contextData?.userData &&
        axios
          .post("http://13.52.16.160:8082/chat/all_chat_user/", {
            professional_id: contextData?.userData?.user_id,
            role: contextData?.userData?.role,
            user_token: contextData?.userData?.user_token,
          })
          .then((res) => {
            if (res?.data?.status === "Success") {
              setAllChatUser(res?.data?.data?.clients_list);
              axios
                .post("http://13.52.16.160:8082/chat/get_room_id/", {
                  professional_id: contextData?.userData?.user_id,
                  user_token: contextData?.userData?.user_token,
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
                .post("http://13.52.16.160:8082/chat/all_chats/", {
                  professional_id: contextData?.userData?.user_id,
                  user_token: contextData?.userData?.user_token,
                  role: "professional",
                  client_id:
                    res?.data?.data?.clients_list[otherUserId]?.client_id,
                  page: chatPageId.page,
                  page_size: chatPageId.page_size,
                })
                .then((respo) => {
                  setChatListData(respo?.data?.data?.messages.reverse());
                });
            }
          });
    } else {
      contextData?.userData &&
        axios
          .post("http://13.52.16.160:8082/chat/all_chat_user/", {
            client_id: contextData?.userData?.user_id,
            role: contextData?.userData?.role,
            user_token: contextData?.userData?.user_token,
          })
          .then((res) => {
            if (res?.data?.status === "Success") {
              setAllChatUser(res?.data?.data?.professional_list);
              axios
                .post("http://13.52.16.160:8082/chat/get_room_id/", {
                  client_id: contextData?.userData?.user_id,
                  role: contextData?.userData?.role,
                  user_token: contextData?.userData?.user_token,
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
                .post("http://13.52.16.160:8082/chat/all_chats/", {
                  client_id: contextData?.userData?.user_id,
                  role: contextData?.userData?.role,
                  user_token: contextData?.userData?.user_token,
                  professional_id:
                    res?.data?.data?.professional_list[otherUserId]
                      ?.professional_id,
                  page: chatPageId.page,
                  page_size: chatPageId.page_size,
                })
                .then((response) => {
                  setChatListData(response?.data?.data?.messages.reverse());
                });
            }
          })
          .catch((err) => console.log(err));
    }
  }, [contextData?.userData, otherUserId, dataChange]);
  if (wskt) {
    wskt.onmessage = function (event) {
      var data = JSON.parse(event.data);
      setDataChange(data.message);
    };
  }
  const chatUserSearchSubmit = () => {
    if (chatsearchfullnamedata.first_name === "") {
      IsSearchUserFound(false);
    } else if (chatsearchfullnamedata.first_name) {
      axios
        .post("http://13.52.16.160:8082/chat/search_profile_chat/", {
          user_id: contextData?.userData?.user_id,
          user_token: contextData?.userData?.user_token,
          role: contextData?.userData?.role,
          first_name: chatsearchfullnamedata.first_name,
          last_name: chatsearchfullnamedata.last_name,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            setSearchState(true);
            if (contextData?.userData?.role === "professional") {
              if (res.data.data.client_list != "No result Found") {
                setAllChatUser(res?.data?.data?.client_list);
                IsSearchUserFound(true);
              }
              if (res.data.data.client_list == "No result Found") {
                IsSearchUserFound(false);
              }
            }
            if (contextData?.userData?.role === "client") {
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

  return (
    <>
      <ChatHeader />
      <section className="chatbox">
        <div className="container">
          <div
            className="row chats-header theme-bg-color"
            style={{ maxHeight: "inherit" }}
          >
            <div className="col-3 d-flex align-items-center justify-content-between border-end">
              <h5 className="m-0">Chats</h5>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="search d-flex align-items-center"
              >
                <input
                  className="search__input"
                  type="search"
                  placeholder="Search"
                  value={searchPara}
                  id="searchInput"
                  onChange={(e) => {
                    searchInput();
                    setSearchPara(e.target.value);
                  }}
                />
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
            <div
              className="col-9 d-flex align-items-center p-2"
              style={{ minHeight: "61px" }}
            >
              <Avatar
                src={chatsUserTitle.userPic}
                alt={"avatar"}
                size="large"
                type="rounded-circle"
              />

              <div className="ms-3">{chatsUserTitle.userSelected}</div>
            </div>
          </div>
          <Tab.Container
            id="left-tabs-example"
            activeKey={currentActiveChatPane}
          >
            <Row className="chats-main" style={{ maxHeight: "100% " }}>
              <Col
                sm={3}
                id="chatusersdisplaybox"
                className="px-0"
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
                        ?.map((data, index) => (
                          <>
                            {data?.name ? (
                              <ChatItem
                                key={index}
                                avatar={data?.avatar ? data?.avatar : noUserPic}
                                alt={data?.alt}
                                title={`${data?.name?.slice(0, 15)}${
                                  data?.name?.length <= 15 ? "" : "..."
                                }`}
                                subtitle={`${data?.last_msg?.slice(0, 15)}${
                                  data?.last_msg?.length <= 15 ? "" : "..."
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
                                }}
                              />
                            ) : (
                              <h1 style={{ color: "white" }}>Hello</h1>
                            )}
                          </>
                        ))}
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
                                title={`${data?.name?.slice(0, 15)}${
                                  data?.name?.length <= 15 ? "" : "..."
                                }`}
                                // onClick={() => {
                                //   setCurrentActiveChatPane("first");
                                //   setChatsUserTitle({
                                //     userPic: data?.avatar
                                //       ? data?.avatar
                                //       : noUserPic,
                                //     userSelected: data?.name,
                                //   });
                                //   setOtherUserId(index);
                                // }}
                                onClick={() => {
                                  // setCurrentActiveChatPane("first");
                                  if (
                                    contextData?.userData?.role === "client"
                                  ) {
                                    axios
                                      .post(
                                        "http://13.52.16.160:8082/chat/get_room_id/",
                                        {
                                          client_id:
                                            contextData?.userData.user_id,
                                          user_token:
                                            contextData?.userData.user_token,
                                          role: "professional",
                                          professional_id:
                                            data?.professional_id,
                                        }
                                      )
                                      .then((res) => {
                                        if (res.data.status === "Success") {
                                          setSearchState(false);

                                          setSearchPara("");
                                        }
                                      });
                                  } else {
                                    axios
                                      .post(
                                        "http://13.52.16.160:8082/chat/get_room_id/",
                                        {
                                          client_id: data?.client_id,
                                          user_token:
                                            contextData?.userData.user_token,
                                          role: "professional",
                                          professional_id:
                                            contextData?.userData.user_id,
                                        }
                                      )
                                      .then((res) => {
                                        if (res.data.status === "Success") {
                                          setSearchState(false);
                                          setSearchPara("");
                                        }
                                      });
                                  }
                                }}
                              />
                            ) : (
                              <h1 style={{ color: "white" }}>Hello</h1>
                            )}
                          </>
                        ))}
                  </Nav>
                )}
                {/* {searchState ? (
                  <Nav variant="pills" className="flex-column">
                    {allChatUser &&
                      allChatUser
                        .filter((data) =>
                          data?.name
                            .toLowerCase()
                            .includes(searchPara.toLowerCase())
                        )
                        .map((data, index) => (
                          <>
                            {data?.name ? (
                              <ChatItem
                                key={index}
                                avatar={data.avatar ? data.avatar : noUserPic}
                                alt={data?.alt}
                                title={data?.name}
                                // subtitle={`${data?.last_msg.slice(0, 15)}${
                                //   data?.last_msg.length <= 15 ? "" : "..."
                                // }`}
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
                                }}
                              />
                            ) : (
                              <h1 style={{ color: "white" }}>Hello</h1>
                            )}
                          </>
                        ))}
                  </Nav>
                ) : isSearchUserFound === true ? (
                  contextData?.userData?.role ===
                  "professional" ? (
                    <Nav variant="pills" className="flex-column">
                      {allChatUser &&
                        allChatUser?.map((data, index) => (
                          <>
                            {data?.name ? (
                              <ChatItem
                                key={index}
                                avatar={data.avatar ? data.avatar : noUserPic}
                                alt={data?.alt}
                                title={data?.name}
                                // date={data?.last_msg_time}
                                unread={data?.last_msg}
                                onClick={() => {
                                  setCurrentActiveChatPane("first");
                                  axios
                                    .post(
                                      "http://13.52.16.160:8082/chat/get_room_id/",
                                      {
                                        professional_id:
                                          contextData?.userData
                                            .user_id,
                                        user_token:
                                          contextData?.userData
                                            .user_token,
                                        role: "professional",
                                        client_id: data?.client_id,
                                      }
                                    )
                                    .then((res) => {
                                      if (res.data.status === "Success") {
                                        setSearchState(false);
                                        contextData.setIsOnChatPage(
                                          !contextData.isOnChatPage
                                        );
                                      }
                                    });

                                  setSearchPara("");
                                }}
                              />
                            ) : (
                              <h1 style={{ color: "white" }}>Hello</h1>
                            )}
                          </>
                        ))}
                    </Nav>
                  ) : (
                    <Nav variant="pills" className="flex-column">
                      {allChatUser &&
                        allChatUser?.map((data, index) => (
                          <>
                            {data?.name ? (
                              <ChatItem
                                key={index}
                                avatar={data.avatar ? data.avatar : noUserPic}
                                alt={data?.alt}
                                title={data?.name}
                                // date={data?.last_msg_time}
                                unread={data?.last_msg}
                                onClick={() => {
                                  setCurrentActiveChatPane("first");
                                  axios
                                    .post(
                                      "http://13.52.16.160:8082/chat/get_room_id/",
                                      {
                                        client_id:
                                          contextData?.userData
                                            ?.user_id,
                                        user_token:
                                          contextData?.userData
                                            ?.user_token,
                                        role: contextData?.userData
                                          ?.role,
                                        professional_id: data?.professional_id,
                                      }
                                    )
                                    .then((res) => {
                                      if (res.data.status === "Success") {
                                        setSearchState(false);
                                        contextData.setIsOnChatPage(
                                          !contextData.isOnChatPage
                                        );
                                      }
                                    });

                                  setSearchPara("");
                                }}
                              />
                            ) : (
                              // "dgawuidga"
                              <h1 style={{ color: "white" }}>Hello</h1>
                            )}
                          </>
                        ))}
                    </Nav>
                  )
                ) : (
                  "no user found"
                )} */}
              </Col>

              <Col
                sm={9}
                className="px-0 "
                id="chatsdisplaybox"
                style={{
                  height: `${parseInt($(".chatbox").height()) - 61}px`,
                  overflowY: "auto",
                  backgroundColor: "#c7c7c7",
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
                      style={{ position: " absolute", bottom: 0 }}
                    >
                      {chatListData &&
                        chatListData.map((message, index) =>
                          message?.type === "text" ? (
                            <MessageBox
                              key={index}
                              title={message?.name}
                              type={message?.type}
                              text={message?.data}
                              position={
                                message?.status === "Send" ? "right" : "left"
                              }
                            />
                          ) : (
                            <a download target="_blank" href={message?.data}>
                              <MessageBox
                                position={
                                  message?.status === "Send" ? "right" : "left"
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
                                  status: {
                                    click: false,
                                    loading: 0,
                                  },
                                }}
                              />
                            </a>
                          )
                        )}
                      <div className="row mx-0" ref={messageEndRef}>
                        <div className="col-10 d-flex">
                          <input
                            className="chatMessageInputText"
                            placeholder="Type here..."
                            id="chat-message"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                          />
                          <Button
                            id="chat-submit"
                            text={"Send"}
                            title="Send"
                            onClick={(e) => {
                              wskt.send(
                                JSON.stringify({
                                  message: messageInput,
                                  sender: contextData?.userData?.role,
                                  type: "message",
                                })
                              );

                              setMessageInput("");
                            }}
                          />
                        </div>
                        <div className="col-2">
                          <Formik
                            initialValues={{
                              file: "",
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                              const fileUpload = new FormData();
                              fileUpload.append("attachment", values.file);

                              if (
                                contextData?.userData.role === "professional"
                              ) {
                                fileUpload.append(
                                  "professional_id",
                                  contextData?.userData?.user_id
                                );
                              } else {
                                fileUpload.append(
                                  "cliend_id",
                                  contextData?.userData.user_id
                                );
                              }
                              fileUpload.append(
                                "role",
                                contextData?.userData.role
                              );
                              fileUpload.append(
                                "user_token",
                                contextData?.userData.user_token
                              );

                              if (
                                contextData?.userData.role === "professional"
                              ) {
                                fileUpload.append(
                                  "client_id",
                                  allChatUser[otherUserId]?.client_id
                                );
                              } else {
                                fileUpload.append(
                                  "professional_id",
                                  allChatUser[otherUserId]?.professional_id
                                );
                              }

                              axios
                                .post(
                                  "http://13.52.16.160:8082/chat/upload_file/",
                                  fileUpload
                                )
                                .then((res) => {
                                  if (res?.data?.status === "Success") {
                                    wskt.send(
                                      JSON.stringify({
                                        message: res?.data?.data?.file_path,
                                        attachment_id:
                                          res?.data?.data?.attchment_id,
                                        sender: contextData?.userData?.role,
                                        type: "file",
                                      })
                                    );
                                  }
                                });
                            }}
                          >
                            {({ isSubmitting, setFieldValue }) => (
                              <Form className="chatBoxFileSelectMainBox">
                                <div className="fileSelectLinkChatbox">
                                  <AiOutlineLink color="white" />
                                  <input
                                    type="file"
                                    name="file"
                                    onChange={(event) => {
                                      setFieldValue(
                                        "file",
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                </div>
                                <button type="submit">
                                  <AiOutlineSend color="white" />
                                </button>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </Tab.Content>
                )}
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </section>
      <ToastContainer />
      {/* <Footer /> */}
    </>
  );
};

export default Chat;
