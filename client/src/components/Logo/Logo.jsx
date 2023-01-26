import { Link } from 'react-router-dom'

import './Logo.css'

const Logo = ({ id }) => {
  return (
    <Link to='/' id={id} className='logo'><span>YsaDC</span><span>.</span></Link>
  )
}

export default Logo
