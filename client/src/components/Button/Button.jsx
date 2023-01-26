import './Button.css'

const Button = ({ text, color, hasArrow, handleClick }) => {

  const arrow = hasArrow ? <svg width="50" height="22" viewBox="0 0 72 22" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeWidth="2" d="M.043 11.119h70.714M60.917 1.319l9.8 9.8-9.8 9.8"></path></svg> : "";
  
  return (
    <div className='btn-arrow' onClick={handleClick} style={{ '--color-btn': color }} >
      <span>{text}</span>
      {arrow}
    </div>
  )
}

export default Button
