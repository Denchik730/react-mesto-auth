import React from 'react';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ApprovalPopup from './ApprovalPopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

import api from '../utils/api';

import * as auth from '../utils/auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isApprovalPopupOpen, setIsApprovalPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loadingPopupRequest, setLoadingPopupRequest] = React.useState(false);
  const [willDeleteCard, setWillDeleteCard] = React.useState(null);

  const [emailUser, setEmailUser] = React.useState('');
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);
  const [successRegister, setSuccessRegister] = React.useState(null);


  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    api.getAllNeededData()
      .then(data => {
        const [userData, cardData] = data;

        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch(err => console.log(err))
  }, []);

  React.useEffect(() => {
    checkToken();
  }, []);

  const handleIsLogged = () => {
    setLoggedIn(true);
  }

  const checkToken = () => {
    const jwt = localStorage.getItem('token');
      if (jwt) {
        auth.getContent(jwt).then((data) => {
         if (data) {
          setEmailUser(data.data.email);
          handleIsLogged();
          navigate("/", {replace: true})
        }
      });
    }
  }

  const handleRegister = (password, email) => {
    auth.register(password, email)
    .then(data => {
      navigate('/sign-in', {replace: true});
    })
  }

  const handleLogin = (password, email) => {
    auth.authorize(password, email)
    .then(data => {
      if (data.token){
        handleIsLogged();
        navigate('/', {replace: true});
      }
    })
  }

  const handleSignout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in', {replace: true});
  }

  const handleAddPlaceSubmit = (newCardData) => {
    setLoadingPopupRequest(true);

    api.addNewUserCard(newCardData)
      .then(newApiCardData => {
        setCards([newApiCardData, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoadingPopupRequest(false))
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    if (isLiked) {
      api.dislikeCard(card._id)
        .then(newCard => {
          setCards((cards) => cards.map((item) => item._id === card._id ? newCard : item));
        })
        .catch(err => console.log(err))
    } else {
      api.likeCard(card._id)
        .then(newCard => {
          setCards((cards) => cards.map((item) => item._id === card._id ? newCard : item));
        })
        .catch(err => console.log(err))
    }
  }

  const handleCardDelete = (card) => {
    setLoadingPopupRequest(true);

    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();

      })
      .catch(err => console.log(err))
      .finally(() => setLoadingPopupRequest(false))
  }

  const handleUpdateUser = (newUserData) => {
    setLoadingPopupRequest(true);

    api.setProfileUserInfo(newUserData)
      .then(newApiUserData => {
        setCurrentUser(newApiUserData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoadingPopupRequest(false))

  }

  const handleUpdateAvatar = (newAvatarData) => {
    setLoadingPopupRequest(true);

    api.changeUserAvatar(newAvatarData)
      .then(() => {
        setCurrentUser({...currentUser, avatar: newAvatarData.avatar});
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoadingPopupRequest(false))
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleDeleteBtnClick = (card) => {
    setWillDeleteCard(card);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleApprovalClick = () => {
    setIsApprovalPopupOpen(true);
  }


  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsApprovalPopupOpen(false);

    setSelectedCard(null);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || willDeleteCard;

  React.useEffect(() => {
    function closeEscape(evt) {
      if (evt.key === `Escape`) {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeEscape);
    }

    return () => {
      document.removeEventListener('keydown', closeEscape);
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>

        <Header
          loggedIn={loggedIn}
          emailUser={emailUser}
          handleSignout={handleSignout}/>
        {/* <MenuMobile/> */}


        <Routes>

          {/* <Route path="/" element={
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onApproval={handleApprovalClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteBtnClick}
              cards={cards}
              />
          }/> */}

          <Route path="/" element={
            <ProtectedRoute
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onApproval={handleApprovalClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteBtnClick}
              cards={cards}
              loggedIn={loggedIn}
              />}
          />

          <Route path="/sign-in" element={
            <Login handleLogin={handleLogin}/>
          }/>

          <Route path="/sign-up" element={
            <Register
              handleRegister={handleRegister}/>
          }/>

          {/* <Route path="/" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} /> */}

        </Routes>

        {loggedIn && <Footer/>}

        <InfoTooltip/>

        <EditProfilePopup isLoadingRequest={loadingPopupRequest} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

        <AddPlacePopup isLoadingRequest={loadingPopupRequest} onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

        <EditAvatarPopup isLoadingRequest={loadingPopupRequest} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

        <ApprovalPopup card={willDeleteCard} isLoadingRequest={loadingPopupRequest} onDeleteCard={handleCardDelete} isOpen={isApprovalPopupOpen} onClose={closeAllPopups}></ApprovalPopup>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}/>

      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
