"use client"

import { useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./Navbar.css"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, []) // Removed unnecessary dependency: location

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="logo"></div>
          <h1>EventMaster Pro</h1>
        </div>

        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        <div className={`navbar-links ${isMenuOpen ? "show-menu" : ""}`}>
          <NavLink to="/dashboard" className="nav-item" aria-label="Dashboard">
            <i className="fas fa-home"></i> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/create-event" className="nav-item" aria-label="Create Event">
            <i className="fas fa-plus-circle"></i> <span>Create Event</span>
          </NavLink>
          <NavLink to="/manage-events" className="nav-item" aria-label="Manage Events">
            <i className="fas fa-tasks"></i> <span>Manage Events</span>
          </NavLink>

          {localStorage.getItem("token") ? (
            <button className="nav-item logout-btn" onClick={handleLogout} aria-label="Logout">
              <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
            </button>
          ) : (
            <NavLink to="/" className="nav-item" aria-label="Login">
              <i className="fas fa-sign-in-alt"></i> <span>Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

