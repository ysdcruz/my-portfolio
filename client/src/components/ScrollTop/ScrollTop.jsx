import { useState, useEffect } from 'react';

import './ScrollTop.css';

const ScrollTop = () => {

  const [lastScrollTop, setLastScrollTop] = useState(window.scrollY);
  
  const scrollContainer = () => {
    return document.documentElement || document.body;
  };

  useEffect(() => {
    
    const scrollBtn = document.getElementById("scroll-top");

    scrollBtn.addEventListener("animationend", (evt) => {
      if(evt.type === "animationend") {
        if(scrollContainer().scrollTop < 200) {
          scrollBtn.classList.remove("fade-out");
          scrollBtn.style.display = "";
        }
      }
    });

    window.addEventListener("scroll", () => {

      var isScrollDown = lastScrollTop < window.scrollY;

      if(isScrollDown && scrollContainer().scrollTop > 200) {
        scrollBtn.style.display = "flex";
        scrollBtn.classList.add("fade-in");
      } else if(!isScrollDown && scrollContainer().scrollTop <= 200) {
        scrollBtn.classList.remove("fade-in");
        scrollBtn.classList.add("fade-out");
      }

      setLastScrollTop(window.scrollY);

    });

  });

  return (
    <div id='scroll-top' className='hoverable' onClick={ 
      () => {
        import('../../helpers/ScrollSection').then(module => {
          module.default.top();
        });
      } }>
      <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
        <g id='SVGRepo_iconCarrier'> 
          <path d='M19.9201 15.0499L13.4001 8.52989C12.6301 7.75989 11.3701 7.75989 10.6001 8.52989L4.08008 15.0499' stroke='#fff' strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round'></path> 
        </g>
      </svg>
    </div>
  )
}

export default ScrollTop
