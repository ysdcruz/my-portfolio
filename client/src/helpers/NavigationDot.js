const NavigationDot = ( query, element ) => {
  var indicator = document.getElementById("active-indicator");
  var index = [...document.querySelectorAll(query)].indexOf(element);

  [...document.querySelectorAll(".nav__links")].forEach(nav => {
    nav.classList.remove("active");
  });

  document.getElementsByClassName("nav__links")[index].classList.add("active");

  if(index >= 0)
    indicator.style.transform = "translateY(" + ( index * 100 ) + "%)";

  return (null);
}

export default NavigationDot
