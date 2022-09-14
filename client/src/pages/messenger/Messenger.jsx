import React from "react";
import styled from "styled-components";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";
import ChatOnline from "../../components/ChatOnline";

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
  display : flex;
  flex-direction : column;
  align-items : center;
  
`;

const ChatMenuInput = styled.input`
  width: 70%;
  padding: 10px 0px;
  border: none;
  border-bottom: 1px solid #555;
  &:focus {
    outline:none;
  }
`;

const ChatBox = styled.div`
  flex: 6;
`;

const ChatBoxWrapper = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : space-between;
  height : 90%;
`;

const ChatBoxTop = styled.div`
  height : 100%;
  overflow-y : scroll;
  padding-right : 10px;
`;

const ChatBoxBottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatMessageInput = styled.textarea`
  width : 80%;
  height : 90px;
  padding : 10px;
  resize : none;
  border-radius : 10px;
`;

const ChatSubmitButton = styled.button`
  width : 70px;
  height: 40px;
  border : none;
  border-radius : 10px;
  cursor : pointer;
  background-color : #022049;
  color : white;
  font-weight: 500;
`;

const ChatOnlineContainer = styled.div`
  flex: 3;
`;

const ChatOnlineWrapper = styled.div`
  padding: 10px;
`;

export default function Messenger() {
  return (
    <Container>
      <ChatMenu>
        <ChatMenuWrapper>
          <ChatMenuInput placeholder="Search for friends" />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
        </ChatMenuWrapper>
      </ChatMenu>
      <ChatBox>
        <ChatBoxWrapper>
          <ChatBoxTop>
            <Message />
            <Message own={true} />
            <Message />
            <Message />
            <Message own={true} />
            <Message />
            <Message />
            <Message own={true} />
            <Message />
            <Message />
            <Message own={true} />
            <Message />
          </ChatBoxTop>
          <ChatBoxBottom>
            <ChatMessageInput placeholder="write something ..."></ChatMessageInput>
            <ChatSubmitButton>Send</ChatSubmitButton>
          </ChatBoxBottom>
        </ChatBoxWrapper>
      </ChatBox>
      <ChatOnlineContainer>
        <ChatOnlineWrapper>
          <ChatOnline />
          <ChatOnline />
          <ChatOnline />
        </ChatOnlineWrapper>
      </ChatOnlineContainer>
    </Container>
  );
}
