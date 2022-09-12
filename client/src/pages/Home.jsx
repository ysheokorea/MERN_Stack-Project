import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default function Home({type}) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios({
        url: `http://localhost:8889/api/v1/videos/${type}`,
        method: "get",
      });
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);
  
  return (
    <Container>
      {videos.map((video) => {
        return <Card key={video._id} video={video}/>;
      })}
    </Container>
  );
}
