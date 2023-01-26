const SectionScrollObserver = {
  enable: observer => {
    // Add intersection observer to all sections
    document.querySelectorAll("section").forEach(section => observer.observe(section));
  }, 
  disable: observer => {
    // Remove intersection observer to all sections
    document.querySelectorAll("section").forEach(section => observer.unobserve(section));
  }
}

export default SectionScrollObserver
