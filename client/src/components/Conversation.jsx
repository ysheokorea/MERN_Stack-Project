import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  gap: 10px;
  &:hover {
    background-color: #eee;
  }
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const ConversationName = styled.span`
  font-weight: 500;
`;

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(
      (item) => item !== currentUser._id
    );
    const findFriends = async () => {
      try {
        if(friendId){
          const res = await axios({
            url: `http://localhost:9999/api/v1/users?userId=${friendId}`,
            method: "GET",
            withCredentials: true,
          });
          setUser(res.data);
        }
      } catch (error) {}
    };
    findFriends();
  }, []);

  return (
    <Container>
      <Avatar src="https://image.ajunews.com/content/image/2022/07/06/20220706160753669738.jpg" />
      <ConversationName>{user?.username}</ConversationName>
    </Container>
  );
}
