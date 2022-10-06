import close from "../images/CloseIcon.svg";
import check from "../images/check.svg";
import redX from "../images/redX.svg";

export function InfoTooltip({onClose}) {
  return (
    /*modal for the image popup*/
    /*<div className={`modal ${isOpen && "modal_open"}`} id="image-popup">*/
    <div>{/*classname=modal*/}
      <div className="popup__content">
        <img className="popup__image" src={redX} />
        {/*src={`url(${card.link})`}*/}
        <button type="button" className="modal__close-button" onClick={onClose}>
          <img src={close} alt="X" />
        </button>
        <h2 className="popup__caption">hello</h2>
      </div>
    </div>
  );
}
