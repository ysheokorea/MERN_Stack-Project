import "./login.css";

export default function Login() {
  return <div className="login">
    <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">Social App</h3>
            <span className="loginDesc">Connect with friends and the world around you on Social App</span>
        </div>
        <div className="loginRight">
            <div className="loginBox">
                <input type="email" placeholder="Email" className="loginInput" />
                <input type="password" placeholder="Password" className="loginInput" />
                <button className="loginButton">Log In</button>
                <span className="loginForgot">Forgot Password</span>
                <button className="loginRegister">Create a New Account</button>
            </div>
        </div>
    </div>
  </div>;
}
