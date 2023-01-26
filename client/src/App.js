import './App.css'

import './fonts/MADE TOMMY Black Outline.otf'
import './fonts/MADE TOMMY Black.otf'
import './fonts/MADE TOMMY Light.otf'
import './fonts/MADE TOMMY Medium Outline.otf'
import './fonts/MADE TOMMY Medium.otf'
import './fonts/MADE TOMMY Regular Outline.otf'
import './fonts/MADE TOMMY Regular.otf'
import './fonts/MADE TOMMY Thin.otf'

import './fonts/MDPrimerTest-Black.otf'
import './fonts/MDPrimerTest-Light.otf'
import './fonts/MDPrimerTest-Regular.otf'
import './fonts/MDPrimerTest-Semibold.otf'

import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, lazy } from 'react'

const Home = lazy(() => import('./pages/Home/Home'))

function App() {
  
	const [ mode, setMode ] = useState([
	  {
      // True if browser is in dark mode
      checked: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false),
      title: "Switch to " + (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "Light" : "Dark") + " Mode",
	  }
  ]);

  var staggerDelay = 0;

  // Element observer on viewport entry
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if(entry.target.classList.contains("hidden-stagger-start"))
        staggerDelay = 0;

      if(entry.target.classList.contains("hidden-stagger")) {
        staggerDelay += 0.1;
        
        entry.target.style.transitionDelay = staggerDelay + "s";
      }
      

      if(entry.isIntersecting)
        entry.target.classList.add("show");
    });
  };

  var observer = new IntersectionObserver(observerCallback);

  useEffect(() => {
    document.querySelectorAll(".hidden").forEach(element => observer.observe(element));

    // Delay transition of elements after loading
    setTimeout( () => {
      document.body.classList.add("transition-after-load");
    }, 1000);
  
    // Detect theme change from browser
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', evt => {
      if(evt.matches)
        setMode(
          {
            checked: true,
            title: "Switch to Light Mode"
          }
        );
      else
        setMode(
          {
            checked: false,
            title: "Switch to Dark Mode"
          }
        );
    });
    
    // Activate/deactive dark mode
    if(mode[0].checked)
      document.body.classList.add("dark--scheme");
    else
      document.body.classList.remove("dark--scheme");

  });

  return (
    <Routes>
      {/* <Route path='/' element={<Layout />}> */}
        <Route index element={<Home mode={mode[0]} setMode={setMode} />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App