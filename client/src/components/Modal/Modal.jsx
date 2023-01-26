import { useEffect } from 'react';
import BodyFixed from '../../helpers/BodyFixed';

import './Modal.css'

const Modal = ({ openModal, setOpenModal, origin }) => {

  const handleModal = () => {
    var styles = {
      "opacity": "0",
      "visibility": "hidden",
    };

    BodyFixed(false);

    document.getElementsByClassName("modal--wrapper")[0].classList.remove("slide-modal");
    
    setTimeout(() => {
      const modal = document.getElementsByClassName("modal--wrapper")[0];
      Object.assign(modal.style, styles);
    }, 280);

    setTimeout(() => {
      setOpenModal({
        isOpen: false,
        title: "",
        image: "",
        about: "",
        tools: "",
        link: "",
        linkLabel: ""
      });
    }, 400);
  }

  const handleClick = (evt) => {
    evt.preventDefault();

    if(evt.target.classList.contains("modal--wrapper"))
      handleModal();
  }

  const handleLink = (evt) => {
    window.open(evt.target.href, "_blank");
  }

  const link = openModal.link !== null ? 
    <a href={openModal.link} className='modal__link flex-row' target='_blank' rel='noopener noreferrer' onClick={handleLink}>
      <span className='underline-effect'>{openModal.linkLabel}</span>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6H7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5m-6 0 7.5-7.5M15 3h6v6"></path>
        </g>
      </svg>
    </a> : "";

  useEffect(() => {

    if(openModal.isOpen) {
      var styles = {
        "opacity": "1",
        "visibility": "visible",
      };

      BodyFixed(true);

      setTimeout(() => {
        const modal = document.getElementsByClassName("modal--wrapper")[0];
        Object.assign(modal.style, styles);
      }, 10);

      setTimeout(() => {
        document.getElementsByClassName("modal--wrapper")[0].classList.add("slide-modal");
      }, 100);

      const modalContent = document.getElementsByClassName("modal__content--wrapper")[0];
      modalContent.innerHTML = "<h5 class='modal__content--title'>" + openModal.title + "</h5>" 
        + "<div class='modal__image'>"
        +   "<img src='" + openModal.image + "' alt='" + openModal.title + "' />"
        + "</div>"
        + "<div class='modal__content'>" 
        +   "<h6>Overview</h6>" 
        +   openModal.about 
        +   "<h6>Technologies</h6>" 
        +   "<div class='modal__content--tools flex-row'>" 
        +     openModal.tools 
        +   "</div>"
        + "</div>";
      
      document.getElementsByClassName('modal__image')[0].scrollTop = 0;
    }

  });

  return (
    <div className={`modal--wrapper ${openModal.isOpen ? 'show-modal' : ''} flex-col`} onClick={handleClick}>
      <aside className='modal__main flex-col'>
        <div className='modal__close--container flex-row'>
          <div className='modal__close' onClick={handleModal}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <g clipPath="url(#clip0_429_11240)"> 
                <circle cx="12" cy="12" r="9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle> 
                <path d="M13 9L10 12L13 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
              <defs> 
                <clipPath id="clip0_429_11240">
                  <rect width="24" height="24" fill="white"></rect>
                </clipPath> 
              </defs>
            </g>
          </svg>
          </div>
          <p className='underline-effect' onClick={handleModal}>{origin}<span>.</span></p>
        </div>
        <div className='modal__content--wrapper'>
        </div>
      </aside>
      {link}
    </div>
  )
}

export default Modal
