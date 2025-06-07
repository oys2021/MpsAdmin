"use client"

import { useState } from "react"
import "../styles/Pages.css"

function Admins() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock admin data
  const admins = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@gctu.edu.gh",
      role: "Super Admin",
      department: "IT Department",
      lastLogin: "2025-01-15 09:30:45",
      status: "active",
    },
    {
      id: 2,
      name: "Finance Manager",
      email: "finance@gctu.edu.gh",
      role: "Finance Admin",
      department: "Finance Department",
      lastLogin: "2025-01-14 16:22:10",
      status: "active",
    },
    {
      id: 3,
      name: "Student Affairs",
      email: "studentaffairs@gctu.edu.gh",
      role: "Department Admin",
      department: "Student Affairs",
      lastLogin: "2025-01-13 11:45:32",
      status: "active",
    },
    {
      id: 4,
      name: "Registrar Office",
      email: "registrar@gctu.edu.gh",
      role: "Department Admin",
      department: "Registrar's Office",
      lastLogin: "2025-01-12 14:15:20",
      status: "active",
    },
    {
      id: 5,
      name: "Hostel Manager",
      email: "hostel@gctu.edu.gh",
      role: "Department Admin",
      department: "Hostel Management",
      lastLogin: "2025-01-10 09:05:18",
      status: "inactive",
    },
    {
      id: 6,
      name: "Library Admin",
      email: "library@gctu.edu.gh",
      role: "Department Admin",
      department: "Library",
      lastLogin: "2025-01-08 13:40:22",
      status: "active",
    },
  ]

  // Filter admins based on search term and active tab
  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.department.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && admin.status === "active"
    if (activeTab === "inactive") return matchesSearch && admin.status === "inactive"

    return matchesSearch
  })

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-left">
          <h1>Administrators</h1>
          <p>Manage administrator accounts and permissions.</p>
        </div>
        <div className="header-right">
          <button className="primary-btn">
            <span>➕</span> Add Admin
          </button>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search administrators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>🔍</button>
        </div>
        <div className="filter-options">
          <select>
            <option value="">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Finance Admin">Finance Admin</option>
            <option value="Department Admin">Department Admin</option>
          </select>
          <select>
            <option value="">All Departments</option>
            <option value="IT Department">IT Department</option>
            <option value="Finance Department">Finance Department</option>
            <option value="Student Affairs">Student Affairs</option>
            <option value="Registrar's Office">Registrar's Office</option>
            <option value="Hostel Management">Hostel Management</option>
            <option value="Library">Library</option>
          </select>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Admins</h3>
          </div>
          <div className="stat-value">6</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Active Admins</h3>
          </div>
          <div className="stat-value">5</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Departments</h3>
          </div>
          <div className="stat-value">6</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Last Login</h3>
          </div>
          <div className="stat-value">Today</div>
          <div className="stat-footer">09:30 AM</div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
            All Administrators
          </button>
          <button className={activeTab === "active" ? "active" : ""} onClick={() => setActiveTab("active")}>
            Active
          </button>
          <button className={activeTab === "inactive" ? "active" : ""} onClick={() => setActiveTab("inactive")}>
            Inactive
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Last Login</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>
                  <div className="admin-cell">
                    <div>{admin.name}</div>
                    <div className="admin-email">{admin.email}</div>
                  </div>
                </td>
                <td>{admin.role}</td>
                <td>{admin.department}</td>
                <td>{admin.lastLogin}</td>
                <td>
                  <span className={`status-badge ${admin.status}`}>
                    {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view">👁️</button>
                    <button className="action-btn edit">✏️</button>
                    <button className="action-btn delete">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-header">
        <h2>Admin Activity Log</h2>
      </div>

      <div className="activity-log">
        <div className="activity-item">
          <div className="activity-icon">🔐</div>
          <div className="activity-content">
            <div className="activity-header">
              <span className="activity-user">Admin User</span>
              <span className="activity-time">Today, 09:30 AM</span>
            </div>
            <div className="activity-description">Logged into the system</div>
          </div>
        </div>

        <div className="activity-item">
          <div className="activity-icon">✏️</div>
          <div className="activity-content">
            <div className="activity-header">
              <span className="activity-user">Finance Manager</span>
              <span className="activity-time">Yesterday, 04:22 PM</span>
            </div>
            <div className="activity-description">Updated payment settings</div>
          </div>
        </div>

        <div className="activity-item">
          <div className="activity-icon">👤</div>
          <div className="activity-content">
            <div className="activity-header">
              <span className="activity-user">Student Affairs</span>
              <span className="activity-time">Yesterday, 11:45 AM</span>
            </div>
            <div className="activity-description">Added new student account</div>
          </div>
        </div>

        <div className="activity-item">
          <div className="activity-icon">📊</div>
          <div className="activity-content">
            <div className="activity-header">
              <span className="activity-user">Registrar Office</span>
              <span className="activity-time">Jan 12, 2025, 02:15 PM</span>
            </div>
            <div className="activity-description">Generated semester report</div>
          </div>
        </div>

        <div className="activity-item">
          <div className="activity-icon">🔒</div>
          <div className="activity-content">
            <div className="activity-header">
              <span className="activity-user">Admin User</span>
              <span className="activity-time">Jan 10, 2025, 10:05 AM</span>
            </div>
            <div className="activity-description">Updated system security settings</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admins
