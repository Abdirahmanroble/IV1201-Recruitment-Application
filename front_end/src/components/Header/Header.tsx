import { Link, useLocation } from "react-router-dom";

//import { HeaderProps } from "../../@types/Header";
import "./Header.css";

function Header(/*props: HeaderProps*/) {
  const currentPath = useLocation().pathname;

  let signingIn = "",
    creatingAccount = "";

  currentPath === "/"
    ? (signingIn = "pressed-path")
    : (creatingAccount = "pressed-path");

  return (
    <div className="header-container">
      <div className="header-title">Recruitment Application</div>
      <div className="header-paths">
        <Link to="/" className="App-link">
          <div className={`${signingIn}`}>Login</div>
        </Link>
        <Link to="/create-account" className="App-link">
          <div className={`${creatingAccount}`}>Create Account</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
