import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Ynstagram</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon"/>
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <span className="topbarLink">Homepage</span>
        <span className="topbarLink">Feeds</span>
      <div className="topbarIcons">
        <div className="topbarIconItem">
          <PersonIcon />
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <ChatIcon />
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <NotificationsIcon />
          <span className="topbarIconBadge">1</span>
        </div>
      </div>
      <img src="../assets/person/1.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  );
}
