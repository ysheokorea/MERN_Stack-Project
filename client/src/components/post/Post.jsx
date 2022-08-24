import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Users } from "../../dummyData";
import { useState } from "react";
import { useEffect } from "react";

export default function Post({ post }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(()=>{
    setLoading(true);
    const newUser = Users.filter(item=>{
      return item.id === post.userId;
    })
    console.log('newUser', newUser);
    setUser(newUser[0]);
    setLoading(false);
  },[])
  
  const likeHandler = () =>{
    setLike(isLiked ? like-1 : like+1);
    setIsLiked(!isLiked);
  }
  
  return (
    <>
    {loading ? (
      <h3>loading ...</h3>
    ) : (

    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={user?.profilePicture}
              alt=""
              className="postProfileImg"
            />
            <span className="postUsername">{user?.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  );
}
