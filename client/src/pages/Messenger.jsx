import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import ChatOnline from "../components/ChatOnline";
import Topbar from "../components/Topbar";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100vw;
  background-color: #eeeeee08;
  display: flex;
`;

const ChatMenu = styled.div`
  flex: 3;
`;

const ChatMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatMenuInput = styled.input`
  width: 70%;
  padding: 10px 0px;
  border: none;
  border-bottom: 1px solid #555;
  &:focus {
    outline: none;
  }
`;

const ChatBox = styled.div`
  flex: 6;
`;

const ChatBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
  position: relative;
`;

const ChatBoxTop = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-right: 10px;
`;

const ChatBoxBottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatMessageInput = styled.textarea`
  width: 80%;
  height: 90px;
  padding: 10px;
  resize: none;
  border-radius: 10px;
`;

const ChatSubmitButton = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #022049;
  color: white;
  font-weight: 500;
`;

const ChatOnlineContainer = styled.div`
  flex: 3;
`;

const ChatOnlineWrapper = styled.div`
  padding: 10px;
`;

const NoConversationText = styled.span`
  position: absolute;
  top: 10%;
  font-size: 30px;
  color: #dededeff;
  align-self: center;
  cursor: default;
`;

export default function Messenger() {
  const { user, socket } = useContext(UserContext);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    if (user) socket.emit("addUser", user);
    socket.on("getUsers", (users) => {
      setOnlineUsers(
        user?.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);
  
  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        if (user) {
          const res = await axios({
            url: `http://localhost:9999/api/v1/conversations/${user._id}`,
            method: "GET",
          });

          setConversation(res.data);
        }
      } catch (error) {}
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios({
          url: `http://localhost:9999/api/v1/messages/${currentChat?._id}`,
        });
        setMessages(res.data);
      } catch (error) {}
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    const receiverId = currentChat?.members.find(
      (member) => member !== user?._id
    );
    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios({
        url: "http://localhost:9999/api/v1/messages/",
        method: "post",
        data: {
          conversationId: currentChat?._id,
          sender: user?._id,
          text: newMessage,
        },
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {}
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSend(e);
    }
  };

  return (
    <>
      <Topbar />
      <Container>
        <ChatMenu>
          <ChatMenuWrapper>
            <ChatMenuInput placeholder="Search for friends" />
            {conversation.map((item) => {
              return (
                <div
                  key={item._id}
                  onClick={() => setCurrentChat(item)}
                  style={{ cursor: "pointer" }}
                >
                  <Conversation
                    conversation={item}
                    key={item._id}
                    currentUser={user}
                  />
                </div>
              );
            })}
          </ChatMenuWrapper>
        </ChatMenu>
        <ChatBox>
          <ChatBoxWrapper>
            {currentChat ? (
              <>
                <ChatBoxTop>
                  {messages.map((m) => {
                    return (
                      <div ref={scrollRef} key={m._id}>
                        <Message
                          message={m}
                          key={m._id}
                          own={m.sender === user?._id}
                        />
                      </div>
                    );
                  })}
                </ChatBoxTop>
                <ChatBoxBottom>
                  <ChatMessageInput
                    placeholder="write something ..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    onKeyDown={(e) => handleEnter(e)}
                  ></ChatMessageInput>
                  <ChatSubmitButton onClick={handleSend}>Send</ChatSubmitButton>
                </ChatBoxBottom>
              </>
            ) : (
              <NoConversationText>
                open a conversation to start a chat
              </NoConversationText>
            )}
          </ChatBoxWrapper>
        </ChatBox>
        <ChatOnlineContainer>
          <ChatOnlineWrapper>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user?._id}
              setCurrentChat={setCurrentChat}
            />
            
          </ChatOnlineWrapper>
        </ChatOnlineContainer>
      </Container>
    </>
  );
}
