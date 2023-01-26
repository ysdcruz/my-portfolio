const BodyFixed = ( isFixed) => {
  
  var body = document.getElementsByTagName("body")[0];
  var scrollPosition = window.scrollY;
  var windowScroll = body.style.top;

  let scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';

  var styles = {
    "overflow": isFixed ? "hidden" : "",
    "position": isFixed ? "fixed" : "",
    "top": isFixed ? -scrollPosition + "px" : "",
    "width": isFixed ? "calc(100% - " + scrollbarWidth + ")" : ""
  };

  Object.assign(body.style, styles);
  
  if(!isFixed) {
    window.scrollTo({
      top: parseFloat(windowScroll) * -1
    });
  }
  
  return (null)
}

export default BodyFixed
