import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;

export default function Recommendation({ tags }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios({
        url: `http://localhost:8889/api/v1/videos/tags?tags=${tags}`,
        method: "GET",
        withCredentials: true,
      });
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return <Container>
    {videos.map(video=>{
        return <Card type="sm" key={video._id} video={video}/>
    })}
  </Container>;
}
