import { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const [user, setUser] = useState({});
  const params = useParams();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  

  useEffect(() => {
    const fetchUser = async () => {
      const result = await axios({
        url: `http://localhost:8801/api/users?username=${params.username}`,
      });
      setUser(result.data);
    };
    fetchUser();
  }, [params.username]);

  return (
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  PF +
                  (user.coverPicture
                    ? user.coverPicture
                    : "person/noCover.jpeg")
                }
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  PF +
                  (user.profilePicture
                    ? user.profilePicture
                    : "person/noAvatar.jpeg")
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={params.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
