import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 10px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

export default function Comments({ videoId }) {
  const [comments, setComments] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios({
          url: `http://localhost:8889/api/v1/comments/${videoId}`,
          method: "GET",
          withCredentials: true,
        });
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, []);

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser._id} />
        <Input placeholder="Add a comment ... " />
      </NewComment>
      {comments.map((comment) => {
        return <Comment key={comment._id} comment={comment} />;
      })}
    </Container>
  );
}
