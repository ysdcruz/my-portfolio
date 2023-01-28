import { useEffect } from 'react';

import NavigationDot from '../../helpers/NavigationDot';
import SectionScrollObserver from '../../helpers/SectionScrollObserver';

import './Navigation.css';

const Navigation = ({ observer }) => {
  
  const onClick = (evt) => {
    // Prevent hash from being appended to url and jumping to section
    evt.preventDefault();

    // Temporarily disable observer
    SectionScrollObserver.disable(observer);

    var element = evt.target.tagName === "A" ? evt.target : evt.target.parentElement,
        section = document.getElementById(element.hash.substr(1));

    // Scroll to section
    window.scrollTo({
      // Position of the element relative to the whole page
      top: section.getBoundingClientRect().top + window.scrollY - 60,
      behavior: 'smooth'
    });

    NavigationDot(".nav__links", element);

    // Enable observer after 1s
    setTimeout(() => {
      SectionScrollObserver.enable(observer);
    }, 1000);
	}

  const navDot = () => {

    const ul = document.querySelector("#one-page-nav > ul");
  
    if(ul.querySelectorAll("li").length <= 0) {
      [...document.querySelectorAll("section")].forEach(sec => {
        var secName = sec.id;
        var span = document.createElement("span");
        span.textContent = secName.charAt(0).toUpperCase() + secName.slice(1);
  
        var a = document.createElement("a");
        a.href = "#" + secName;
        a.className = "nav__links hoverable";
        a.addEventListener("click", (evt) => {
          onClick(evt);
        });
        a.appendChild(span);
  
        var li = document.createElement("li");
        li.appendChild(a);
        ul.appendChild(li);
      });
    }
 }

  useEffect(() => {
    navDot();
  });

  return (
    <nav id='one-page-nav'>
      <ul>
        <span id='active-indicator'></span>
      </ul>
    </nav>
  )
}

export default Navigation
