import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Messenger from "./pages/Messenger";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import { io } from "socket.io-client";

function App() {
  const [user, SetUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [socket, setSocket] = useState(io("ws://localhost:9998"));
  
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <UserContext.Provider value={{ user, SetUser, socket }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
