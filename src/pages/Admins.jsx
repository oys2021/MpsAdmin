"use client"

import { useState, useEffect } from "react"
import "../styles/Pages.css"
import { refreshAccessToken } from "../hooks/useTokenRefresh"

const API_BASE_URL = "http://192.168.103.192:8080/api/users"

function Admins() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    department: "",
    role_description: "",
    status: ""
  })

  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [adminStats, setAdminStats] = useState({
    total_admin: 0,
    total_active_admin: 0,
    total_inactive_admin: 0,
    last_login: null
  })


  const fetchWithTokenRefresh = async (url, options = {}) => {
    let token = localStorage.getItem("accessToken")
    let response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...options.headers
      }
    })

    // Handle token expiration
    if (response.status === 401) {
      const newToken = await refreshAccessToken()
      if (newToken) {
        token = newToken
        response = await fetch(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${newToken}`,
            ...options.headers
          }
        })
      }
    }

    return response
  }

  // Fetch admins data
  const fetchAdmins = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchWithTokenRefresh(`${API_BASE_URL}/admins/`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch admins: ${response.status}`)
      }

      const data = await response.json()
      setAdmins(data.map(admin => ({
        id: admin.id,
        name: admin.full_name,
        email: admin.email,
        phone: admin.phone_number,
        role_description: admin.admin_profile?.role_description_description || "Admin",
        department: admin.admin_profile?.department || "N/A",
        lastLogin: admin.last_login ? new Date(admin.last_login).toLocaleString() : "Never",
        status: admin.admin_profile?.status
      })))
    } catch (error) {
      console.error("Failed to fetch admins:", error)
      setError("Failed to load admins. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Fetch admin stats
  const fetchAdminStats = async () => {
    try {
      const response = await fetchWithTokenRefresh(`${API_BASE_URL}/admin-stats/`)
      
      if (!response.ok) throw new Error("Failed to fetch admin stats")
      
      const data = await response.json()
      setAdminStats({
        total_admin: data.total_admin || 0,
        total_active_admin: data.total_active_admin || 0,
        total_inactive_admin: data.total_inactive_admin || 0,
        last_login: data.last_login || null
      })
    } catch (err) {
      console.error("Error fetching admin stats:", err)
      // Reset to safe defaults on error
      setAdminStats({
        total_admin: 0,
        total_active_admins: 0,
        total_inactive_admin: 0,
        last_login: null
      })
    }
  }

  // Initialize data
  useEffect(() => {
    const loadData = async () => {
      await fetchAdmins()
      await fetchAdminStats()
    }
    
    loadData()
  }, [])

  // Filter admins
  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      (admin.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (admin.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (admin.role_description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (admin.department || "").toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && admin.status === "active"
    if (activeTab === "inactive") return matchesSearch && admin.status === "inactive"

    return matchesSearch
  })

  // Open modals
  const openAddModal = () => setIsAddModalOpen(true)
  
  const openViewModal = (admin) => {
    setSelectedAdmin(admin)
    setIsViewModalOpen(true)
  }
  
  const openEditModal = (admin) => {
    setSelectedAdmin(admin)
    setFormData({
      full_name: admin.name,
      email: admin.email,
      phone_number: admin.phone || "",
      department: admin.department,
     role_description: admin.role_description,
      status: admin.status
    })
    setIsEditModalOpen(true)
  }

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Submit form (add/edit)
  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      full_name: formData.full_name,
      email: formData.email,
      phone_number: formData.phone_number,
      password: "@admin1234", // Default password
      role: "admin",
      admin_profile: {
      department: formData.department,
       role_description: formData.role_description_description,
      }
    }

    try {
      let response
      
      if (isAddModalOpen) {
        // Add new admin
        response = await fetchWithTokenRefresh(`${API_BASE_URL}/register/`, {
          method: "POST",
          body: JSON.stringify(payload)
        })
      } else {
        // Update existing admin
        response = await fetchWithTokenRefresh(`${API_BASE_URL}/admins/${selectedAdmin.email}/`, {
          method: "PUT",
          body: JSON.stringify(payload)
        })
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Something went wrong")
      }

      // Refresh data
      await fetchAdmins()
      await fetchAdminStats()
      
      // Close modal and reset form
      setIsAddModalOpen(false)
      setIsEditModalOpen(false)
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        department: "",
        role_description: "",
        status: "active"
      })
    } catch (error) {
      console.error("Submit failed:", error)
      alert(`Admin operation failed: ${error.message}`)
    }
  }

  const deleteAdmin = async (email) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return

    try {
      const response = await fetchWithTokenRefresh(`${API_BASE_URL}/admins/${email}/`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error("Failed to delete admin")
      }

      // Refresh admin list
      await fetchAdmins()
      await fetchAdminStats()
    } catch (error) {
      console.error("Delete failed:", error)
      alert(`Delete failed: ${error.message}`)
    }
  }

  const formatStatValue = (value) => {
    return (value || 0).toLocaleString()
  }


  const formatLastLogin = (dateString) => {
    if (!dateString) return "Never"
    
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    
    return date.toLocaleDateString()
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-left">
          <h1>Administrators</h1>
          <p>Manage administrator accounts and permissions.</p>
        </div>
        <div className="header-right">
          <button className="primary-btn" onClick={openAddModal}>
            <span>➕</span> Add Admin
          </button>
        </div>
      </div>

      {/* Search and filter section */}
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
        {/* <div className="filter-options">
          <select>
            <option value="">All role_descriptions</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Department Admin">Department Admin</option>
            <option value="Support Admin">Support Admin</option>
          </select>
          <select>
            <option value="">All Departments</option>
            <option value="IT Department">IT Department</option>
            <option value="Finance">Finance</option>
            <option value="Student Affairs">Student Affairs</option>
            <option value="Library">Library</option>
          </select>
        </div> */}
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Admins</h3>
          </div>
          <div className="stat-value">{formatStatValue(adminStats.total_admin)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Active Admins</h3>
          </div>
          <div className="stat-value">{formatStatValue(adminStats.total_active_admin)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Inactive Admins</h3>
          </div>
          <div className="stat-value">{formatStatValue(adminStats.total_inactive_admin)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Last Login</h3>
          </div>
          <div className="stat-value">{formatLastLogin(adminStats.last_login)}</div>
          {adminStats.last_login && (
            <div className="stat-footer">
              {new Date(adminStats.last_login).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
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

      {/* Admins table */}
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
            {loading ? (
              <tr>
                <td colSpan="7" className="loading-indicator">Loading administrators...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="error-indicator">{error}</td>
              </tr>
            ) : filteredAdmins.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-results">No administrators found</td>
              </tr>
            ) : (
              filteredAdmins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>
                    <div className="admin-cell">
                      <div>{admin.name}</div>
                      <div className="admin-email">{admin.email}</div>
                    </div>
                  </td>
                  <td>{admin.role_description}</td>
                  <td>{admin.department}</td>
                  <td>{admin.lastLogin}</td>
                  <td>
                    <span className={`status-badge ${admin.status}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn view" 
                        onClick={() => openViewModal(admin)}
                      >
                        👁️
                      </button>
                      <button 
                        className="action-btn edit" 
                        onClick={() => openEditModal(admin)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="action-btn delete" 
                        onClick={() => deleteAdmin(admin.email)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled>Previous</button>
        <span className="page-info">Page 1 of 1</span>
        <button disabled>Next</button>
      </div>

      {/* Add Admin Modal */}
      {isAddModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Add New Administrator</h2>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="full_name" 
                  value={formData.full_name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone_number" 
                  value={formData.phone_number} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <select 
                    name="department" 
                    value={formData.department} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="IT Department">IT Department</option>
                    <option value="Finance">Finance</option>
                    <option value="Student Affairs">Student Affairs</option>
                    <option value="Library">Library</option>
                    <option value="Registrar">Registrar</option>
                    <option value="Hostel Management">Hostel Management</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>role_description</label>
                  <select 
                    name="role_description" 
                    value={formData.role_description} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Department Admin">Department Admin</option>
                    <option value="Suport Admin">Suport Admin</option>
                  </select>
                </div>

                 
              </div>
              
              <div className="form-group">
                <label>Account Status</label>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Add Administrator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Admin Modal */}
      {isViewModalOpen && selectedAdmin && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Administrator Details</h2>
              <button className="modal-close-btn" onClick={() => setIsViewModalOpen(false)}>✕</button>
            </div>
            
            <div className="student-profile">
              <div className="profile-header">
                <div className="avatar">{selectedAdmin.name?.charAt(0) || "A"}</div>
                <div>
                  <h3>{selectedAdmin.name}</h3>
                  <p>{selectedAdmin.email}</p>
                </div>
              </div>
              
              <div className="student-details">
                <div className="detail-item">
                  <span className="detail-label">ID:</span>
                  <span>{selectedAdmin.id}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Phone:</span>
                  <span>{selectedAdmin.phone || "N/A"}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">role_description:</span>
                  <span>{selectedAdmin.role_description}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Department:</span>
                  <span>{selectedAdmin.department}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Last Login:</span>
                  <span>{selectedAdmin.lastLogin || "Never"}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge ${selectedAdmin.status}`}>
                    {selectedAdmin.status.charAt(0).toUpperCase() + selectedAdmin.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer single">
              <button className="primary-btn" onClick={() => {
                setIsViewModalOpen(false)
                openEditModal(selectedAdmin)
              }}>
                Edit Administrator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {isEditModalOpen && selectedAdmin && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Edit Administrator</h2>
              <button className="modal-close-btn" onClick={() => setIsEditModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="full_name" 
                  value={formData.full_name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  disabled // Email shouldn't be editable
                />
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone_number" 
                  value={formData.phone_number} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <select 
                    name="department" 
                    value={formData.department} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="IT Department">IT Department</option>
                    <option value="Finance">Finance</option>
                    <option value="Student Affairs">Student Affairs</option>
                    <option value="Library">Library</option>
                    <option value="Registrar">Registrar</option>
                    <option value="Hostel Management">Hostel Management</option>
                  </select>
                </div>

                

                 <div className="form-group">
                  <label>role_description</label>
                  <select 
                    name="role_description" 
                    value={formData.role_description} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Department Admin">Department Admin</option>
                    <option value="Suport Admin">Suport Admin</option>
                  </select>
                </div>
                
              </div>
              
              <div className="form-group">
                <label>Account Status</label>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admins