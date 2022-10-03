import React, { useState } from "react";

import close from "../images/CloseIcon.svg";

import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { Main } from "./Main.js";

import { PopupWithForm } from "./PopupWithForm.js";

import { ImagePopup } from "./ImagePopup.js";

import apiObj from "../utils/api.js";

import { UserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  /*state variable for the card the user clicked on/ is seeing the image popup of*/
  const [selectedCard, setSelectedCard] = useState(null);
  /*state variable for the cards on the page */
  const [cards, setCards] = useState([]);
  /*state variables responsible for visibility of popups*/
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setTimeout(() => {
      setSelectedCard(null);
    }, 500);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(info) {
    apiObj
      .patchUserInfo(info)
      .then((userInfoResponse) => {
        //we do these 2 commands in 1 .then statement because they don't have to be done sequentially
        setCurrentUser(userInfoResponse);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }

  function handleUpdateAvatar(info) {
    apiObj
      .patchUserAvatar(info)
      .then((userInfoResponse) => {
        //we do these 2 commands in 1 .then statement because they don't have to be done sequentially
        setCurrentUser(userInfoResponse);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }

  function handleAddPlace(info) {
    apiObj
      .uploadCard(info)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups())
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    //The some() method tests whether at least one element in the array passes the test
    //in this case, if 1 of the likes is from the current user, we need to make the heart dark
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    //if !isLiked- if the card was not liked before and now the user wants to like it
    if (!isLiked) {
      apiObj.likeCard(card._id).then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        ).catch((err) => {
          console.log(err); // log the error to the console
        });
      });
    }
    //if isLiked - if the user already liked it and is now unliking it
    else {
      apiObj
        .unlikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard
            )
          );
        })
        .catch((err) => {
          console.log(err); // log the error to the console
        });
    }
  }

  function handleCardDelete(card) {
    apiObj
      .deleteCard(card._id)
      .then(() => {
        //filter will only include cards that pass the test- in this case, it includes all cards except the deletedCard
        setCards((state) =>
          state.filter((CurrentCard) => CurrentCard._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }

  //this is called when the component is mounted. we pass it [] to make sure it only gets call once when its mounted
  //otherwise it would be called every time it updates
  React.useEffect(() => {
    apiObj
      .getUserInfo()
      .then((userInfoResponse) => {
        setCurrentUser(userInfoResponse);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }, []);

  //load the initial cards from the server
  React.useEffect(() => {
    apiObj
      .getInitialCards()
      .then((cardsResponse) => {
        setCards(cardsResponse);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }, []); //empty array tells it to only do once (when it is mounted)

  return (
    <UserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleEditPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <PopupWithForm
            title="Are you sure?"
            //fix the name and isOpen later - this is the confirmation popup for delete
            name=""
            isOpen={false}
            onClose={closeAllPopups}
          />
        </div>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />

        {/*modal for the image popup*/}
        <div className="popup modal" id="image-popup">
          <div className="popup__content">
            <img className="popup__image" />
            <button type="button" className="modal__close-button">
              <img src={close} alt="X" />
            </button>
            <h2 className="popup__caption">insert caption here</h2>
          </div>
        </div>

        {/*modal for the delete button to ask if the user is sure*/}
        <div className="modal" id="delete-card-modal">
          <div className="modal__content">
            <button type="button" className="modal__close-button">
              <img src={close} alt="X" />
            </button>
            <h2 className="modal__title">Are you sure?</h2>
            <form name="delete" className="modal__form">
              {/*form is needed so that PopupWithForm class works with this html*/}
              <button type="submit" className="modal__submit-button">
                Yes
              </button>
            </form>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
