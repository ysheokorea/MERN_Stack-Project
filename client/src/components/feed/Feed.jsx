import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import { Posts } from "../../dummyData";
import axios from "axios";

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {

      const result = username 
        ? await axios({
        url: `http://localhost:8801/api/posts/profile/${username}`,
      })
      : await axios({
        url: "http://localhost:8801/api/posts/timeline/63045d352285f58c4ce92dbb",
      })
      setPosts(result.data)
    };
    fetchPost();
  }, [username]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map(item=>{
          return <Post key={item._id} post={item} />
        })}
      </div>
    </div>
  );
}
