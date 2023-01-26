import './ModeToggle.css'

const ModeToggle = ({ mode, setMode }) => {

  const handleChange = () => {
    setMode([
      {
        checked: !mode.checked,
        title: "Switch to " + (mode.checked ? "Dark" : "Light") + " Mode"
      }
    ]);
	}
  
  return (
    <div id='mode-toggle-container'>
      <input type='checkbox' id='mode-toggle' onChange={handleChange} checked={mode.checked} />
      <label htmlFor='mode-toggle' id='mode-toggle-box' className='hoverable' data-tooltip={mode.title} >
        <div id='dark-mode-toggle'>
          <svg width='170px' height='170px' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' version='1.1' fill='none' stroke='#d3d3d3' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5'><g id='SVGRepo_bgCarrier' strokeWidth='0'></g><g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='m1.75 8c0 3.45 2.8 6.25 6.25 6.25 3.41-.0027 6.25-3 6.25-6-1 .5-4 1.5-6-.5s-1-5-.5-6c-3 0-6 2.84-6 6.25z'></path> </g></svg>
        </div>
        <div id='light-mode-toggle'>
          <svg width='170px' height='170px' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' version='1.1' fill='none' stroke='#d3d3d3' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5'><g id='SVGRepo_bgCarrier' strokeWidth='0'></g><g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g><g id='SVGRepo_iconCarrier'> <circle cy='8' cx='8' r='3.25'></circle> <path d='m2.75 13.25.5-.5m9.5 0 .5.5m-.5-10 .5-.5m-10 .5-.5-.5m-.50 5.25h-1m13.5 0h-1m-5.75 5.75v1m0-13.5v1'></path> </g></svg>
        </div>
      </label>
      
    </div>
  )
}


export default ModeToggle
