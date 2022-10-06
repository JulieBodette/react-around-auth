import close from "../images/CloseIcon.svg";
import check from "../images/check.svg";
import redX from "../images/redX.svg";

export function InfoTooltip({onClose, isOpen}) {
  return (
    <div className={`modal ${isOpen && "modal_open"}`}>{/*} id="infotooltip-popup">*/}
      <div className="infotooltip__content">
        <img className="infotooltip__image" src={redX} />
        {/*src={`url(${card.link})`}*/}
        <button type="button" className="infotooltip__close-button" onClick={onClose}>
          <img src={close} alt="X" />
        </button>
        <h2 className="infotooltip__text">Oops, something went wrong! Please try again.</h2>
      </div>
    </div>
  );
}
