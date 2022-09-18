import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      Home
      <hr />
      <Link to="/messenger">채팅 참여하기</Link>
      <hr />
      <Link to="/signin">로그인</Link>
      <hr />
      <Link to="/signup">회원가입</Link>
    </div>
  );
}
