"use client"

import { useState } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import "../styles/Dashboard.css"

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  return (
    <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">MP</div>
            <div className="logo-text">
              <h2>GCTU MPAS</h2>
              <p>Admin Dashboard</p>
            </div>
          </div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={isActive("/")}>
              <Link to="/">
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li className={isActive("/students")}>
              <Link to="/students">
                <span className="nav-icon">👥</span>
                <span className="nav-text">Students</span>
              </Link>
            </li>
            <li className={isActive("/admins")}>
              <Link to="/admins">
                <span className="nav-icon">👤</span>
                <span className="nav-text">Administrators</span>
              </Link>
            </li>
            <li className={isActive("/transactions")}>
              <Link to="/transactions">
                <span className="nav-icon">💳</span>
                <span className="nav-text">Transactions</span>
              </Link>
            </li>
            <li className={isActive("/payment-history")}>
              <Link to="/payment-history">
                <span className="nav-icon">📊</span>
                <span className="nav-text">Payment History</span>
              </Link>
            </li>
            <li className={isActive("/reports")}>
              <Link to="/reports">
                <span className="nav-icon">📈</span>
                <span className="nav-text">Reports</span>
              </Link>
            </li>
            <li className={isActive("/settings")}>
              <Link to="/settings">
                <span className="nav-icon">⚙️</span>
                <span className="nav-text">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <span className="logout-icon">🚪</span>
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        <header className="top-header">
          <div className="header-left">
            <h1>GCTU Mobile Payment System</h1>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button>🔍</button>
            </div>
            <div className="user-menu">
              <span className="notification-icon">🔔</span>
              <div className="user-profile">
                <div className="user-avatar">AD</div>
                <span className="user-name">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
