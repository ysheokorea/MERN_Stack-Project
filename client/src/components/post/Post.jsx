import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Users } from "../../dummyData";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const result = await axios({
        url: `http://localhost:8801/api/users?userId=${post.userId}`,
      });
      setUser(result.data);
    };
    fetchUser();
    setLoading(false);
  }, [post.userId]);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <>
      {loading ? (
        <h3>loading ...</h3>
      ) : (
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${user.username}`}>
                  {user.profilePicture ? (
                    <img
                      src={PF + user.profilePicture}
                      alt=""
                      className="postProfileImg"
                    />
                  ) : (
                    <img
                      src={PF + "person/noAvatar.jpeg"}
                      alt=""
                      className="postProfileImg"
                    />
                  )}
                </Link>
                <span className="postUsername">{user?.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
              <div className="postTopRight">
                <MoreVertIcon />
              </div>
            </div>
            <div className="postCenter">
              <span className="postText">{post?.desc}</span>
              <img className="postImg" src={PF + post?.img} alt="" />
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img
                  className="likeIcon"
                  src={`${PF}like.png`}
                  onClick={likeHandler}
                  alt=""
                />
                <img
                  className="likeIcon"
                  src={`${PF}heart.png`}
                  onClick={likeHandler}
                  alt=""
                />
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
