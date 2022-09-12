import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled.div`
    display : flex;
    flex-wrap : wrap;
    gap : 10px;

`

export default function Search() {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(()=>{
        const fetchVideos = async () => {
            const res = await axios({
                url : `http://localhost:8889/api/v1/videos/search${query}`,
                method : "GET",
                withCredentials : true,
            })
            setVideos(res.data);
        }
        fetchVideos();
    }, [query])

  return (
    <Container>
        {videos.map(video=>{
            return <Card key={video._id} video={video}/>
        })}
    </Container>
  )
}
