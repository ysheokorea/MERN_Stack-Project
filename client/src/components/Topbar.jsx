import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchIcon from "@mui/icons-material/Search";

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
  background-color : white;
  border-radius : 10px;
  padding : 0px 15px;
  gap : 10px;
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border : none;
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
const UserInfo = styled.span`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

export default function Topbar() {
  return (
    <Container>
      <TopLeft>
        <Logo>RealTime Chat</Logo>
      </TopLeft>
      <TopCenter>
        <SearchBar>
          <SearchIcon style={{ color: "#022049", cursor: "pointer" }} />
          <Input />
        </SearchBar>
      </TopCenter>
      <TopRight>
        <Avatar src="https://i.stack.imgur.com/zTgfN.jpg?s=64&g=1" />
        <UserInfo>User</UserInfo>
      </TopRight>
    </Container>
  );
}
