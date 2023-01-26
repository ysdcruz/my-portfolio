import { useState, useEffect } from 'react'

import './Header.css'

import ModeToggle from '../ModeToggle/ModeToggle'
import Navigation from '../Navigation/Navigation'
import Logo from '../Logo/Logo'

const Header = ({ mode, setMode, observer }) => {

  const [lastScrollTop, setLastScrollTop] = useState(window.scrollY);
  
  // Perform tasks depending on scroll direction
  const scrollDirection = () => {

    var isScrollDown = lastScrollTop < window.scrollY;
    var isScrollBelowMain = window.scrollY > document.getElementById("main-content").offsetTop;

    var header = document.getElementsByTagName("header")[0];

    // Scrolling down/up
    if(isScrollDown) {
      if(!isScrollBelowMain)
        header.classList.remove("sticky");
    } else {
      if(isScrollBelowMain)
      header.classList.add("sticky");
      
      if(window.scrollY === 0 && document.getElementsByTagName("body")[0].style.position !== "fixed")
        header.classList.remove("sticky");
    }

    header.style.top = !isScrollDown ? "" : ( isScrollBelowMain ? "-92px" : "" );
    
    setLastScrollTop(window.scrollY);
  }

  useEffect(() => {

    window.addEventListener("scroll", () => {
      scrollDirection();
    });

  });

  return (
    <>
      <header>
        <Logo id='header__logo' />
        <ModeToggle mode={mode} setMode={setMode}/>
      </header>
      <Navigation observer={observer} />
    </>
	)
}

export default Header
