//its useful to import the css here
//import './header.css'

//we import the image that it needs
import header from "../images/Header.svg";

export function Header() {
  return (
    <header className="header">
      <img className="header__image" src={header} alt="Around the US" />
      {/*we acess the image via variable name {header}*/}
    </header>
  );
}
