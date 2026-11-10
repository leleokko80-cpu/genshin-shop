import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const { isLoggedIn, username, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      {/* Decorative top line */}
      <div className="navbar-glow-line" />

      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">Teyvat<span className="logo-accent">Emporium</span></span>
        </Link>

        {/* Nav links */}
        {isLoggedIn && (
          <div className="navbar-links">
            <Link to="/produits" className="nav-link">Shop</Link>
            <Link to="/cart" className="nav-link cart-link">
              Cart
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
              )}
            </Link>
            <Link to="/orders" className="nav-link">Orders</Link>
          </div>
        )}

        {/* Right side */}
        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <span className="navbar-username">
                <span className="username-star">★</span> {username}
              </span>
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
