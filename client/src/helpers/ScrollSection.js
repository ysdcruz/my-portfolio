const ScrollSection = {
  top: () => { // Scroll to top

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, 

  next: index => { // Scroll to next section

    window.scrollTo({
      // Position of the element relative to the whole page
      top: document.getElementsByTagName("section")[index].getBoundingClientRect().top + window.scrollY,
      behavior: "smooth"
    });

  },

  section: section => { // Scroll to specific section
    
    window.scrollTo({
      // Position of the element relative to the whole page
      top: document.getElementById(section).getBoundingClientRect().top + window.scrollY,
      behavior: "smooth"
    });

  }
}

export default ScrollSection
