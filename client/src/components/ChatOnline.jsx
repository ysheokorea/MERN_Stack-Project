import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0px 0px 10px 10px;
`;

const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
`;

const ImaContainer = styled.div`
  position: relative;
  margin-right: 10px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid white;
`;

const Badge = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: limegreen;
  top: 0;
  right: 0;
`;

const Name = styled.span``;

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        `http://localhost:9999/api/v1/users/friends/${currentId}`
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);


  const handleClick = async (user) =>{
    try{
        const res = await axios({
            url : `http://localhost:9999/api/v1/conversations/find/${currentId}/${user._id}`,
            method : "GET"
        })
        setCurrentChat(res.data);

    }catch(err){
        console.log(err);
    }
  }

  return (
    <>
      {onlineFriends.map((item, idx) => 
        <Container key={idx}>
          <ContainerWrapper onClick ={()=>{handleClick(item)}} >
            <ImaContainer>
              <Avatar src="https://cdn.spotvnews.co.kr/news/photo/202204/520937_728045_5426.jpg" />
              <Badge></Badge>
            </ImaContainer>
            <Name>{item?.username}</Name>
          </ContainerWrapper>
        </Container>
      )}
    </>
  );
}
