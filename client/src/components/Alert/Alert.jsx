import { useEffect } from 'react'
import BodyFixed from '../../helpers/BodyFixed';
import Button from '../Button/Button';

import './Alert.css'

const Alert = ({ alert, closeAlert, successTitle, successMsg, failedTitle, failedMsg }) => {

  const handleClose = () => {
    var styles = {
      "opacity": "0",
      "visibility": "hidden",
    };

    BodyFixed(false);
    
    document.getElementsByClassName("alert--wrapper")[0].classList.remove("slide-alert");

    setTimeout(() => {
      const alert = document.getElementsByClassName("alert--wrapper")[0];
      Object.assign(alert.style, styles);
    }, 500);

    setTimeout(() => {
      closeAlert({
        ...alert,
        isOpen: false,
      });
    }, 620);
  }

  const alertIcon = type => {
    if(type === "success")
      return <div className="icon--container">
          <div className="success-icon__tip"></div>
          <div className="success-icon__long"></div>
        </div>;
    else if(type === "failed")
      return <div className="icon--container">
          <div className="failed-icon__left"></div>
          <div className="failed-icon__right"></div>
        </div>;
  }

  const handleClick = (evt) => {
    evt.preventDefault();

    if(evt.target.classList.contains("alert--wrapper"))
      handleClose();
  }

  useEffect(() => {

    if(alert.isOpen) {
      var styles = {
        "opacity": "1",
        "visibility": "visible",
      };

      BodyFixed(true);

      setTimeout(() => {
        const alert = document.getElementsByClassName("alert--wrapper")[0];
        Object.assign(alert.style, styles);
      }, 10);
      
      setTimeout(() => {
        document.getElementsByClassName("alert--wrapper")[0].classList.add("slide-alert");
      }, 100);
    }

  });

  return (
    <div className={`alert--wrapper ${alert.isOpen ? 'show-alert' : ''} flex-col`} onClick={handleClick}>
      <div className='alert__main flex-col'>
        <div className='alert__content--wrapper'>
          <div className='alert__close' onClick={handleClose}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M4.293,18.293,10.586,12,4.293,5.707A1,1,0,0,1,5.707,4.293L12,10.586l6.293-6.293a1,1,0,1,1,1.414,1.414L13.414,12l6.293,6.293a1,1,0,1,1-1.414,1.414L12,13.414,5.707,19.707a1,1,0,0,1-1.414-1.414Z"></path>
              </g>
            </svg>
          </div>
          <div className='alert__image--container'>
            <div className={`icon--wrapper flex-row ${alert.status}`}>
              {alertIcon(alert.status)}
            </div>
          </div>
          <h5>{ alert.status === 'success' ? 'All good! ' + successTitle : 'Oh no! ' + failedTitle }</h5>
          <p>{ alert.status === 'success' ? successMsg : failedMsg }</p>
          <div className='btn--wrapper content-center'>
            <Button text={alert.status === 'success' ? 'Cool!' : 'Try again'} color='var(--color-primary)' hasArrow={false} handleClick={handleClose}/>
          </div>
          {/* <Logo id='alert__logo' /> */}
        </div>
      </div>
    </div>
  )
}

export default Alert
