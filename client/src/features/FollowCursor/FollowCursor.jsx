import { useState, useEffect, } from 'react'

import './FollowCursor.css'

const FollowCursor = () => {

  const [mousePosition, setMousePosition] = useState({ 
    x: null, 
    y: null 
  });

  const mouseMoveHandler = (evt) => {
    setMousePosition({ 
      x: evt.clientX, 
      y: evt.clientY 
    });
  };

  const handleMouseHoverIn = (evt) => {
    var ballStyles = {
      "transform": "scale(6)",
      "-ms-transform": "scale(6)",
      "-moz-transform": "scale(6)",
      "-webkit-transform": "scale(6)",
    };

    const cursorBall = document.getElementById("cursor--ball");
    Object.assign(cursorBall.style, ballStyles);

    document.getElementById("cursor").style.mixBlendMode = "difference";
    document.getElementById("cursor--ring").style.borderColor = "transparent";

    document.querySelector("#cursor--ring > svg").style.opacity = 1;
  }

  const handleMouseMove = (evt) => {
    var hoverable = evt.target.closest(".hoverable");
    var hoverText = hoverable.dataset.tooltip !== undefined ? hoverable.dataset.tooltip : ""
    document.querySelector("#cursor--ring > svg textPath").innerHTML = hoverText;
  }

  const handleMouseHoverOut = () => {
    var ballStyles = {
      "transform": "scale(1)",
      "-ms-transform": "scale(1)",
      "-moz-transform": "scale(1)",
      "-webkit-transform": "scale(1)",
    };

    document.getElementById("cursor").style.mixBlendMode = "";
    const cursorBall = document.getElementById("cursor--ball");
    Object.assign(cursorBall.style, ballStyles);

    document.getElementById("cursor--ring").style.borderColor = "var(--color-cursor)";

    document.querySelector("#cursor--ring > svg").style.opacity = 0;
  }

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);
    [...document.querySelectorAll(".hoverable")].forEach(element => {
      element.addEventListener("mouseenter", handleMouseHoverIn);
      element.addEventListener("mouseover", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseHoverOut);
    });

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  });

  return (
    <>
      <div id='cursor' style={{ left: mousePosition.x, top: mousePosition.y }}>
        <div id='cursor--ball'></div>
      </div>
      <div id='cursor--ring' style={{ left: mousePosition.x, top: mousePosition.y }}>
        <svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='220px' viewBox='0 0 220 220' enableBackground='new 0 0 240 240'>
        <defs>
            <path id='circlePath' d='M 110, 110 m -44, 0 a 44,44 0 0,1 88,0 a 44,44 0 0,1 -88,0'/>
          </defs>
          <circle cx='150' cy='100' r='75' fill='none'/>
          <g>
            <use xlinkHref='#circlePath' fill='none'/>
            <text>
                <textPath xlinkHref='#circlePath'></textPath>
            </text>
          </g>
        </svg>
      </div>
    </>
  )
}

export default FollowCursor
