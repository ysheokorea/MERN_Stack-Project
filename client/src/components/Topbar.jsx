import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "../context/AuthContext";

const Container = styled.div`
  height: 50px;
  width: 100%;
  background-color: #022049;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;
const TopLeft = styled.div`
  flex: 3;
`;

const Logo = styled.span`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const TopCenter = styled.div`
  flex: 5;
`;
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  padding: 0px 15px;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`;

const TopRight = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: right;
  padding-right: 15px;
`;

const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #444;
`;
const UserInfo = styled.button`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;
`;

const ListContainer = styled.div`
  position: absolute;
  width: 100px;
  height: auto;
  right: 10px;
  background-color: #aaa;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px #123;
  padding: 3px;
  display: none;
  ${UserInfo}:active & {
    display: block;
  }
  ${UserInfo}:focus & {
    display: block;
  }
`;

const LI = styled.li`
  margin: 5px;
  &:hover {
    background-color: #ccc;
  }
`;

const UL = styled.ul`
  padding: 1px;
  list-style: none;
  font-size: 15px;
`;

const HR = styled.hr`
  margin: 10px;
`;

export default function Topbar({ isLogin }) {
  const { user, setUser, socket } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    socket.disconnect();
    navigate("/signin");
  };

  return (
    <Container>
      <TopLeft>
        <Link to="/">
          <Logo>RealTime Chat</Logo>
        </Link>
      </TopLeft>
      <TopCenter>
        <SearchBar>
          <SearchIcon style={{ color: "#022049", cursor: "pointer" }} />
          <Input />
        </SearchBar>
      </TopCenter>
      <TopRight>
        {user ? (
          <>
            <Avatar src="https://i.stack.imgur.com/zTgfN.jpg?s=64&g=1" />
            <UserInfo>
              {user?.username}
              <ListContainer>
                <UL>
                  <LI>내 정보</LI>
                  <HR />
                  <LI onClick={handleLogout}>로그아웃</LI>
                </UL>
              </ListContainer>
            </UserInfo>
          </>
        ) : (
          <>
            <Link to="/signin">
              <UserInfo>Please Login</UserInfo>
            </Link>
          </>
        )}
      </TopRight>
    </Container>
  );
}
