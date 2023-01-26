import { useState, useEffect } from 'react'
import axios from 'axios'

import './Home.css'

import Header from '../../components/Header/Header'
import NavigationDot from '../../helpers/NavigationDot'
import Button from '../../components/Button/Button'
import MessageForm from '../../components/MessageForm/MessageForm'
import Modal from '../../components/Modal/Modal'
import Footer from '../../components/Footer/Footer'
import SectionScrollObserver from '../../helpers/SectionScrollObserver'
import ScrollTop from '../../components/ScrollTop/ScrollTop'
import Alert from '../../components/Alert/Alert'

import Me from './../../images/about/ysadc.png'

import SoftDev from './../../images/skills/software-svgrepo-com.svg'
import WebDev from './../../images/skills/responsive-svgrepo-com.svg'
import HTMLLogo from './../../images/skills/tools/html5.svg'
import CSSLogo from './../../images/skills/tools/css3.svg'
import JSLogo from './../../images/skills/tools/js.svg'
import ReactLogo from './../../images/skills/tools/reactjs.svg'
import jQueryLogo from './../../images/skills/tools/jquery.svg'
import AJAXLogo from './../../images/skills/tools/ajax.svg'
import BootstrapLogo from './../../images/skills/tools/bootstrap.svg'
import WordPressLogo from './../../images/skills/tools/wordpress.svg'
import WordPressWhiteLogo from './../../images/skills/tools/wordpress-white.svg'
import PHPLogo from './../../images/skills/tools/php.svg'
import JavaLogo from './../../images/skills/tools/java.svg'
import CLogo from './../../images/skills/tools/c.svg'
import CSharpLogo from './../../images/skills/tools/c-sharp.svg'
import PythonLogo from './../../images/skills/tools/python.svg'
import RLogo from './../../images/skills/tools/r.svg'
import MySQLLogo from './../../images/skills/tools/mysql.svg'
import PostgresLogo from './../../images/skills/tools/postgresql.svg'
import MongoDBLogo from './../../images/skills/tools/mongodb.svg'
import GitHubLogo from './../../images/skills/tools/github.svg'
import GitHubWhiteLogo from './../../images/skills/tools/github-white.svg'
import JiraLogo from './../../images/skills/tools/jira.svg'
import FigmaLogo from './../../images/skills/tools/figma.svg'

import ALPSPage from './../../images/projects/preview/alps.png'
import HRExpoPage from './../../images/projects/preview/hrexpo.png'
import CCISPage from './../../images/projects/preview/ccis.png'
import Plant8Page from './../../images/projects/preview/plant8.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'

const Home = ({ mode, setMode }) => {

  // Percentage of section areas shown in viewport
  var percentage = [0, 0, 0, 0, 0, 0];

  const thresholdArray = steps => Array(steps + 1)
  .fill(0)
  .map((_, index) => index / steps || 0);

  // Percentage that should be visible from the element before triggering
  var observerOptions = {
    rootMargin: '0px',
    threshold: thresholdArray(20)
  }

  // Section observer on viewport entry
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      // List percentage taken by section in viewport
      percentage[[...document.querySelectorAll("section")].indexOf(entry.target)] = entry.intersectionRatio;

      // Get index of max value
      var index = percentage.indexOf(Math.max(...percentage));

      NavigationDot("section", document.getElementsByTagName("section")[index]);
    });
  };

  var observer = new IntersectionObserver(observerCallback, observerOptions);

  // Set position of interactive circle in home section
  const setHoverCircle = (evt) => {
    const h1 = document.querySelector('#home > .section--wrapper > h1');
    const h2 = document.querySelector('#home > .section--wrapper h2:first-of-type');
    const h2Dot = document.querySelector('#home > .section--wrapper h2:last-of-type');

    var h1Rect = h1.getBoundingClientRect();
    var h2Rect = h2.getBoundingClientRect();
    var h2DotRect = h2Dot.getBoundingClientRect();

    h1.style.setProperty("--x-position", evt.clientX - h1Rect.left + "px");
    h1.style.setProperty("--y-position", evt.clientY - h1Rect.top + "px");

    h2.style.setProperty("--x-position", evt.clientX - h2Rect.left + "px");
    h2.style.setProperty("--y-position", evt.clientY - h2Rect.top + "px");

    h2Dot.style.setProperty("--x-position", evt.clientX - h2DotRect.left + "px");
    h2Dot.style.setProperty("--y-position", evt.clientY - h2DotRect.top + 2 + "px");
  }

  // Scroll to next section
  const scrollNext = (evt) => {
    var index = [...document.querySelectorAll("section")].indexOf(evt.target.closest("section"));

    import('../../helpers/ScrollSection').then(module => {
      module.default.next(index + 1);
    });
  };

  // Scroll to section
  const scrollTo = (evt) => {
    evt.preventDefault();
    
    var section = evt.target.hash.substr(1);

    import('../../helpers/ScrollSection').then(module => {
      module.default.section(section);
    });
  };

  // Scroll to work section
  const scrollWork = () => {
    import('../../helpers/ScrollSection').then(module => {
      module.default.section("work");
    });
  }

  const [openModal, setOpenModal] = useState({
    isOpen: false,
    title: "",
    image: "",
    about: "",
    tools: "",
    link: "",
    linkLabel: ""
  });

  const handleModal = (evt) => {
    var element = evt.target.closest('.cell--grid');
    var projImage = element.querySelector('.cell__image').querySelector('img').src;
    var projTools = element.querySelector('.project--tools').innerHTML;

    setOpenModal({
      isOpen: true,
      title: element.getAttribute("data-title"),
      image: projImage,
      about: element.getAttribute("data-about"),
      tools: projTools,
      link: element.getAttribute("data-link"),
      linkLabel: element.getAttribute("data-link_label")
    });
  }

  // Set scroll duration of project preview
  const projectAnimation = () => {
    [...document.querySelectorAll('#projects .cell__image > img')].forEach(image => {
      var height = image.offsetHeight;
      var scrollTime = (height / image.parentElement.offsetHeight) * 0.4;

      image.style.transitionDuration = scrollTime + "s";
    });
  }

  const [inputValue, setInputValue] = useState(
    {
      name: "",
      email: "",
      message: "",
      nameValid: false,
      emailValid: false,
      emailError: "Email address cannot be empty.",
      messageValid: false
    }
  );

  const [alert, setAlert] = useState({
    isOpen: false,
    status: ""
  });

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    // Reset state and form
    setInputValue({
      name: "",
      email: "",
      message: "",
      nameValid: false,
      emailValid: false,
      emailError: "Email address cannot be empty.",
      messageValid: false
    });

    document.getElementById("message-form").reset();
      
    setAlert({
      isOpen: false,
      status: "",
    });

    [...document.querySelectorAll(".form--group")].forEach(nav => {
      nav.classList.remove("input--focus", "input--error");
    });
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();

    var inputFields = document.getElementsByClassName("form--group");

    if(!(inputValue.nameValid && inputValue.emailValid && inputValue.messageValid)) {
      if(!inputValue.nameValid)
        inputFields[0].classList.add("input--focus", "input--error");

      if(!inputValue.emailValid) {
        inputFields[1].querySelector(".error--wrapper").innerHTML = inputValue.emailError;
        inputFields[1].classList.add("input--focus", "input--error");
      }
        
      if(!inputValue.messageValid)
        inputFields[2].classList.add("input--focus", "input--error");
    } else {
      const newMessage = {
        name: inputValue.name,
        email: inputValue.email,
        message: inputValue.message
      }

      // Show loader
      setLoading(true);
      
      axios.post("http://localhost:3001/send", newMessage)
        .then(res => {
          console.log(res);
          setAlert({
            isOpen: true,
            status: "success"
          });
    
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          
          setAlert({
            isOpen: true,
            status: "failed"
          });
    
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    SectionScrollObserver.enable(observer);

    if(document.querySelector('#projects .cell__image > img').style.transitionDuration === '')
      setTimeout(() => {
        projectAnimation();
      }, 1000);

    const home = document.querySelector('#home > .section--wrapper');

    home.addEventListener("mousemove", (evt) => {
      setHoverCircle(evt);
    });

    [...document.querySelectorAll(".scroll-to")].forEach(link => {
      link.addEventListener("click", scrollTo);
    });
  
    if(alert.isOpen === false && alert.status === "success") {
      resetForm();
    }
  });

  return (
    <>
      <Header mode={mode} setMode={setMode} observer={observer} />
      <ScrollTop />
      <main id='main-content'>
        <section id='home' className='sub-content'>
          <div className='section--wrapper flex-col'>
            <h1 data-text='Ysabel'>Ysabel</h1>
            <div className='flex-row'>
              <h2 data-text='Dela Cruz'>Dela Cruz</h2>
              <h2 data-text='.'>.</h2>
            </div>
            <p>Web & Software Developer<span>.</span></p>
            <div id='scroll-down--prompt' className='flex-col hidden hoverable' data-tooltip='Know more about me' onClick={scrollNext}>
              <div className='mouse flex-row'>
                <div className='scroller'></div>
              </div>
              <span className='scroll-down--arrow'></span>
              <span className='scroll-down--arrow'></span>
              <span className='scroll-down--arrow'></span>
            </div>
          </div>
        </section>
        <section id='about' className='sub-content'>
          <div className='section--wrapper'>
            <div className='section--header content-center'>
              <h6 className='section--overline'>ABOUT</h6>
              <h2 className='hidden'>A Bit About Me</h2>
            </div>
            <div className='grid--wrapper two-column'>
              <div className='content--grid image--border'>
                <div className='image--container hoverable' data-tooltip='Hey, that&apos;s me!'>
                  <img className='hoverable' data-tooltip='Hey, that&apos;s me!' src={Me} alt='' />
                </div>
                <div className='image--bg hoverable' data-tooltip='Hey, that&apos;s me!'></div>
              </div>
              <div className='content--grid'>
                <p className='hidden'>Hi! I'm an IT fresh gradute from Caloocan, Philippines and I love seeing my ideas come to life. As someone who enjoys programming, I am passionate in helping people through the use of technology.</p>
                <p className='hidden'>My main focus is on web development (you can view some of my <a href="#projects" className='bounce-bg-effect scroll-to hoverable' onClick={scrollTo}>projects</a> below) but I can build softwares, too. I'm open to job opportunities where I can continuously learn and grow my career. Feel free to <a href="#contact" className='bounce-bg-effect scroll-to hoverable'onClick={scrollTo}>message</a> me or connect with me through my <a href='https://www.linkedin.com/in/ysabel-dela-cruz/' target='_blank' rel='noopener noreferrer' className='bounce-bg-effect hoverable'>LinkedIn account</a>.</p>
                <a href='./../../files/cv/DelaCruz_Ysabel_CV.pdf' target='_blank' className='btn--wrapper hidden' download><Button text='My Resume' hasArrow={true} color='var(--color-secondary)' /></a>
              </div>
            </div>
          </div>
        </section>
        <section id='skills' className='sub-content'>
          <div className='section--wrapper'>
            <div className='section--header content-center'>
              <h6 className='section--overline'>SKILLS</h6>
              <h2 className='hidden'>What I Do</h2>
            </div>
            <div id='skill--expertise' className='grid--wrapper two-column'>
              <div className='content--grid hidden hidden-stagger-start'>
                <div className='content__header'>
                  <div className='content__header__icon'>
                    <img src={WebDev} alt='' />
                  </div>
                  <h4>Web<br />Development</h4>
                </div>
                <div className='content__description'>
                  <p>Committed in building <em>responsive and functional websites</em>. Proficient both in <em>frontend and backend development</em>. I'm not a designer but I have an <em>eye for good UX/UI design</em>. I enjoy coding from scratch and bringing ideas to life to improve the website.</p>
                </div>
              </div>
              <div className='content--grid hidden hidden-stagger'>
                <div className='content__header'>
                  <div className='content__header__icon'>
                    <img src={SoftDev} alt='' />
                  </div>
                  <h4>Software<br />Development</h4>
                </div>
                <div className='content__description'>
                  <p><em>Naturally curious</em>, I enjoy taking on new challenges and <em>finding solutions for real-world problems</em>. I am knowledgeable in <em>functional programming and OOP</em>. Strives for continuous growth and improvement.</p>
                </div>
              </div>
            </div>
            <div id='skill--tools' className='grid--wrapper'>
              <div className='logo--grid hidden hidden-stagger-start hoverable' data-tooltip='HTML'>
                <div>
                  <img src={HTMLLogo} alt='HTML5' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='CSS'>
                <div>
                  <img src={CSSLogo} alt='CSS3' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='JavaScript'>
                <div>
                  <img src={JSLogo} alt='JavaScript' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='ReactJS'>
                <div>
                  <img src={ReactLogo} alt='ReactJS' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='jQuery'>
                <div>
                  <img src={jQueryLogo} alt='jQuery' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='AJAX'>
                <div>
                  <img src={AJAXLogo} alt='AJAX' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='Bootstrap'>
                <div>
                  <img src={BootstrapLogo} alt='Bootstrap' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='WordPress'>
                <div>
                  <img src={WordPressLogo} className='light-mode' alt='WordPress' />
                  <img src={WordPressWhiteLogo} className='dark-mode' alt='WordPress' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='PHP'>
                <div>
                  <img src={PHPLogo} alt='PHP' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='Java'>
                <div>
                  <img src={JavaLogo} alt='Java' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='C Programming'>
                <div>
                  <img src={CLogo} alt='C Programming' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='C Sharp'>
                <div>
                  <img src={CSharpLogo} alt='C Sharp' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='Python'>
                <div>
                  <img src={PythonLogo} alt='Python' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='R Programming'>
                <div>
                  <img src={RLogo} alt='R Programming' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='MySQL'>
                <div>
                  <img src={MySQLLogo} alt='MySQL' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='PostgreSQL'>
                <div>
                  <img src={PostgresLogo} alt='PostgreSQL' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='MongoDB'>
                <div>
                  <img src={MongoDBLogo} alt='MongoDB' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='GitHub'>
                <div>
                  <img src={GitHubLogo} className='light-mode' alt='GitHub' />
                  <img src={GitHubWhiteLogo} className='dark-mode' alt='GitHub' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='Jira Software'>
                <div>
                  <img src={JiraLogo} alt='Jira Software' />
                </div>
              </div>
              <div className='logo--grid hidden hidden-stagger hoverable' data-tooltip='Figma'>
                <div>
                  <img src={FigmaLogo} alt='Figma' />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id='work' className='sub-content'>
          <div className='section--wrapper'>
            <div className='section--header content-center'>
              <h6 className='section--overline'>WORK</h6>
              <h2 className='hidden'>Previous Experience</h2>
            </div>
            <div className='timeline--wrapper'>
              <div className='event--wrapper flex-row'>
                <div className='event-dot'></div>
                <div className='event-content flex-col'>
                  <div className='event--header'>
                    <h5>Web Developer Intern</h5>
                    <span className='event--company'>NPVN Learning Programs Co.</span>
                    <span className='event--date'>May - July 2022</span>
                  </div>
                  <ul>
                    <li>Developed and co-designed websites of <a href='https://alprograms.com' target='_blank' className='hoverable' rel='noopener noreferrer'>Advanced Learning Programs</a> and <a href='https://hrexposymposium.com' target='_blank' className='hoverable' rel='noopener noreferrer'>Philippine HR Expo and Symposium 2022</a></li>
                    <li>Developed an Apps Script program for auto-generation of e-certificates for Advanced Learning Programs</li>
                    <li>Led the development team as a scrum master</li>
                    <li>Experienced being a business analyst and web quality assurance</li>
                  </ul>
                </div>
              </div>
              <div className='center-line'>
                <div id='timeline--up' className='hoverable' onClick={scrollWork}><FontAwesomeIcon icon={faCaretUp} className='fa-2x' /></div>
              </div>
            </div>
          </div>
        </section>
        <section id='projects' className='sub-content'>
          <div className='section--wrapper'>
            <div className='grid--wrapper image-description-grid'>
              <div className='section--header'>
                <h6 className='section--overline'>PROJECTS</h6>
                <h1>Featured Work</h1>
                <h6>Check out a few of my past projects.</h6>
                <p>While my main focus is on developing responsive websites, I've also developed softwares and am capable of implementing basic data mining techniques.</p>
                {/* <a href='#test' className='btn--wrapper'><Button text='See more' color='var(--color-secondary)' hasArrow={true} /></a> */}
              </div>
              <div className='cell--grid row-1 col-1 hidden hoverable' data-tooltip='Learn more!' data-title='Advanced Learning Programs' data-about='<p>Advanced Learning Programs is a brochure website which allows visitors to browse through the various training programs that the company offers to their clients.</p>' data-link='https://alprograms.com' data-link_label='Open Website' onClick={handleModal}>
                <div className='cell__image'>
                  <img src={ALPSPage} alt='Advanced Learning Programs' />
                </div>
                <div className='cell__label--wrapper'>
                  <div className='cell__label'>
                    <svg className='card__arc' xmlns='http://www.w3.org/2000/svg'><path d='M 40 -0 A 20 20 360 0 1 20 20 h 20 Z'/></svg> 
                    <h6>Advanced Learning Programs</h6>
                    <div className='project--desc flex-col'>
                      <span className='project__yr'>2022</span>
                      <div className='project--tools flex-row'>
                        <span>WordPress</span><span>HTML & CSS</span><span>JavaScript</span><span>jQuery</span><span>PHP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid--wrapper layout--2sm-1md'>
              <div className='cell--grid cell-sm hidden hoverable' data-tooltip='Learn more!' data-title='PH HR Expo and Symposium 2022' data-about='<p>PH HR Expo and Symposium 2022 is a website powered by Advanced Learning Programs that aimed to provide event details to viewers and gain potentail sponsors for the event.</p>' data-link='https://hrexposymposium.com' data-link_label='Open Website' onClick={handleModal}>
                <div className='cell__image'>
                  <img src={HRExpoPage} alt='PH HR Expo and Symposium 2022' />
                </div>
                  <div className='cell__label--wrapper'>
                  <div className='cell__label'>
                    <svg className='card__arc' xmlns='http://www.w3.org/2000/svg'><path d='M 40 -0 A 20 20 360 0 1 20 20 h 20 Z'/></svg> 
                    <h6>PH HR Expo and Symposium 2022</h6>
                    <div className='project--desc flex-col'>
                      <span className='project__yr'>2022</span>
                      <div className='project--tools flex-row'>
                        <span>WordPress</span><span>HTML & CSS</span><span>JavaScript</span><span>jQuery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='cell--grid cell-md last-order first-order-resp hidden hoverable' data-tooltip='Learn more!' data-title='College of Computer and Information Sciences' data-about='<p>The College of Computer and Information Sciences is a website that works as a college platform to disseminate news and announcements. The website has an integrated discussion forum and document request system to improve college communication, processes, and transactions.</p><p>This was a capstone project for my senior year and was deployed for a month for user testing and evaluation.</p>' onClick={handleModal}>
                <div className='cell__image'>
                  <img src={CCISPage} alt='College of Computer and Information Sciences' />
                </div>
                  <div className='cell__label--wrapper'>
                  <div className='cell__label'>
                    <svg className='card__arc' xmlns='http://www.w3.org/2000/svg'><path d='M 40 -0 A 20 20 360 0 1 20 20 h 20 Z'/></svg> 
                    <h6>College of Computer and Information Sciences</h6>
                    <div className='project--desc flex-col'>
                      <span className='project__yr'>2022</span>
                      <div className='project--tools flex-row'>
                        <span>HTML & CSS</span><span>JavaScript</span><span>jQuery</span><span>PHP</span><span>MySQL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='cell--grid cell-sm hidden hoverable' data-tooltip='Learn more!' data-title='Plant 8' data-about='<p>Plant 8 showcases various ornamental plants that the small business offers to its buyers. It lets the admin understand customers&rsquo; behavioral pattern and automatically update recommendated products based on the user&rsquo;s cart through the integrated market basket analysis algorithm in the website.</p>' onClick={handleModal}>
                <div className='cell__image'>
                  <img src={Plant8Page} alt='Plant 8' />
                </div>
                  <div className='cell__label--wrapper'>
                  <div className='cell__label'>
                    <svg className='card__arc' xmlns='http://www.w3.org/2000/svg'><path d='M 40 -0 A 20 20 360 0 1 20 20 h 20 Z'/></svg> 
                    <h6>Plant 8</h6>
                    <div className='project--desc flex-col'>
                      <span className='project__yr'>2022</span>
                      <div className='project--tools flex-row'>
                        <span>HTML & CSS</span><span>JavaScript</span><span>jQuery</span><span>PHP</span><span>R</span><span>MySQL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {openModal.isOpen && <Modal openModal={openModal} setOpenModal={setOpenModal} origin='Home' />}
          </div>
        </section>
        <section id='contact' className='sub-content'>
          <div className='section--wrapper'>
            <div className='flex-col content-center hidden'>
              <div className='section--header'>
                <h6 className='section--overline'>CONTACT</h6>
                <h2>Get In Touch</h2>
                <p>Feel free to send me a message and I'll get back to you!</p>
              </div>
              <MessageForm className='content-center' inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit} loading={loading} />
            </div>
            {alert.isOpen && <Alert alert={alert} closeAlert={setAlert} successTitle='Your message was sent successfully.' successMsg='Thank you for messaging me. I&apos;ll get back to you as soon as possible!' failedTitle='Your message could not be sent.' failedMsg='Something went wrong. Don&apos;t worry, let&apos;s try again.'/>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
