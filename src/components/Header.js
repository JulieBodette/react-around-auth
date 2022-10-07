//its useful to import the css here
//import './header.css'
import {
  BrowserRouter,
  Link
} from "react-router-dom";

//we import the image that it needs
import header from "../images/Header.svg";

export function Header({text, link}) {
  return (
    <header className="header">
      <img className="header__image" src={header} alt="Around the US" />
      {/*we acess the image via variable name {header}*/}
      
      <Link to={link} className="header__login-text">{text}</Link>
      
    </header>
  );
}
