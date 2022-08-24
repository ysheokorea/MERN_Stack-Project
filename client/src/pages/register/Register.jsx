import "./register.css";

export default function Register() {
  return <div className="register">
    <div className="registerWrapper">
        <div className="registerLeft">
            <h3 className="registerLogo">Social App</h3>
            <span className="registerDesc">Connect with friends and the world around you on Social App</span>
        </div>
        <div className="registerRight">
            <div className="registerBox">
            <input type="test" placeholder="Username" className="registerInput" />
            <input type="email" placeholder="Email" className="registerInput" />
                <input type="password" placeholder="Password" className="registerInput" />
                <input type="password" placeholder="Password again" className="registerInput" />
                <button className="registerButton">Sign Up</button>
                <button className="registerRegister">Log into Account</button>
            </div>
        </div>
    </div>
  </div>;
}
