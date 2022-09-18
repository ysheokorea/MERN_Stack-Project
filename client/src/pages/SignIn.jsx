import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginWrapper = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  gap: 20px;
`;
const LoginLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LoginLogo = styled.h3`
  font-size: 50px;
  font-weight: 800;
  color: #022049;
  margin-bottom: 10px;
`;
const LoginDesc = styled.span`
  font-size: 24px;
  font-weight: 300;
`;
const LoginRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginBox = styled.form`
  height: 600px;
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LoginLogoImg = styled.img`
  width : 200px;
  height : auto;
  align-self : center;
`

const LoginInput = styled.input`
  height: 30px;
  width: 80%;
  align-self: center;
  border-radius: 10px;
  border: 1px solid gray;

  font-size: 18px;
  padding-left: 20px;
`;
const LoginButton = styled.button`
  height: 30px;
  border-radius: 10px;
  width: 80%;
  align-self: center;
  border: none;
  background: #0bd618;
  color: white;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
`;
const LoginForgot = styled.span`
  text-align: center;
  color: #022049;
  font-weight: 300;
`;
const LoginRegisterButton = styled.button`
  height: 30px;
  width: 60%;
  border-radius: 10px;
  border: none;
  background: #f61919;
  color: white;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  align-self: center;
`;

export default function SignIn() {
  const { user, SetUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    axios({
      url: "http://localhost:9999/api/v1/auth/signin",
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    }).then(res=>{
        if(res.status === 200){
            SetUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data))
            navigate('/')
        }
    });
  };

  return (
    <LoginContainer>
      
      <LoginWrapper>
        <LoginLeft>
            <Link to="/" style={{textDecoration:"none"}}>
          <LoginLogo>RealTime Chat</LoginLogo>
            </Link>
          <LoginDesc>
            Connect with friends and the world around you on RealTime Chat.
          </LoginDesc>
        </LoginLeft>
        <LoginRight>
          <LoginBox onSubmit={handleClick}>

            <LoginLogo style={{ alignSelf: "center" }}>Sign In</LoginLogo>
            <LoginLogoImg src="https://codestates-urclass.s3.ap-northeast-2.amazonaws.com/common/img_message.png" />
            <LoginInput
              placeholder="Email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <LoginInput
              placeholder="Password"
              type="password"
              minLength={4}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton type="submit">Sign In</LoginButton>
            <hr />
            <LoginForgot>계정이 없으신가요?</LoginForgot>
            <Link to="/signup" style={{ textAlign: "center" }}>
              <LoginRegisterButton>Sign Up</LoginRegisterButton>
            </Link>
          </LoginBox>
        </LoginRight>
      </LoginWrapper>
    </LoginContainer>
  );
}
