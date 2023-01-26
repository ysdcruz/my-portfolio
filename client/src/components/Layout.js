import { Suspense } from "react"
import { Outlet, Link } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/testpage">TestPage</Link></li>
        </ul>
      </nav>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default Layout
