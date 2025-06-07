"use client"

import { useState } from "react"
import "../styles/Pages.css"

function Students() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    program: "",
    level: "",
    status: "active",
    paymentStatus: "paid"
  })

  // Mock student data
  const [students, setStudents] = useState([
      {
      id: "20210001",
      name: "John Doe",
      email: "john.doe@student.gctu.edu.gh",
      program: "Computer Science",
      level: "Level 200",
      status: "active",
      paymentStatus: "paid",
    },
    {
      id: "20210042",
      name: "Mary Smith",
      email: "mary.smith@student.gctu.edu.gh",
      program: "Business Administration",
      level: "Level 300",
      status: "active",
      paymentStatus: "paid",
    },
    {
      id: "20210078",
      name: "David Mensah",
      email: "david.mensah@student.gctu.edu.gh",
      program: "Information Technology",
      level: "Level 100",
      status: "active",
      paymentStatus: "pending",
    },
    {
      id: "20210036",
      name: "Sarah Addo",
      email: "sarah.addo@student.gctu.edu.gh",
      program: "Computer Engineering",
      level: "Level 400",
      status: "active",
      paymentStatus: "paid",
    },
    {
      id: "20210015",
      name: "Michael Owusu",
      email: "michael.owusu@student.gctu.edu.gh",
      program: "Telecommunications Engineering",
      level: "Level 200",
      status: "inactive",
      paymentStatus: "overdue",
    },
    {
      id: "20210089",
      name: "Grace Appiah",
      email: "grace.appiah@student.gctu.edu.gh",
      program: "Computer Science",
      level: "Level 300",
      status: "active",
      paymentStatus: "pending",
    },
    {
      id: "20210054",
      name: "Emmanuel Osei",
      email: "emmanuel.osei@student.gctu.edu.gh",
      program: "Information Technology",
      level: "Level 200",
      status: "active",
      paymentStatus: "paid",
    },
    {
      id: "20210023",
      name: "Abigail Boateng",
      email: "abigail.boateng@student.gctu.edu.gh",
      program: "Business Administration",
      level: "Level 100",
      status: "active",
      paymentStatus: "pending",
    }
    // ... other students
  ])

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && student.status === "active"
    if (activeTab === "pending") return matchesSearch && student.paymentStatus === "pending"
    if (activeTab === "inactive") return matchesSearch && student.status === "inactive"

    return matchesSearch
  })

  // Open modals
  const openAddModal = () => setIsAddModalOpen(true)
  
  const openViewModal = (student) => {
    setSelectedStudent(student)
    setIsViewModalOpen(true)
  }
  
  const openEditModal = (student) => {
    setSelectedStudent(student)
    setFormData(student)
    setIsEditModalOpen(true)
  }

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isAddModalOpen) {
      // Add new student
      setStudents(prev => [
        ...prev,
        {
          ...formData,
          id: `2021${Math.floor(1000 + Math.random() * 9000)}`
        }
      ])
    } else if (isEditModalOpen) {
      // Update existing student
      setStudents(prev => 
        prev.map(student => 
          student.id === selectedStudent.id ? formData : student
        )
      )
    }
    
    // Reset and close modals
    setFormData({
      id: "",
      name: "",
      email: "",
      program: "",
      level: "",
      status: "active",
      paymentStatus: "paid"
    })
    setIsAddModalOpen(false)
    setIsEditModalOpen(false)
  }

  // Delete student
  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id))
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-left">
          <h1>Students Management</h1>
          <p>View and manage all student accounts and payment information.</p>
        </div>
        <div className="header-right">
          <button className="primary-btn" onClick={openAddModal}>
            <span>➕</span> Add Student
          </button>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>🔍</button>
        </div>
        <div className="filter-options">
          <select>
            <option value="">All Programs</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Telecommunications Engineering">Telecommunications Engineering</option>
          </select>
          <select>
            <option value="">All Levels</option>
            <option value="Level 100">Level 100</option>
            <option value="Level 200">Level 200</option>
            <option value="Level 300">Level 300</option>
            <option value="Level 400">Level 400</option>
          </select>
        </div>
      </div>

      {/* Stats cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Students</h3>
          </div>
          <div className="stat-value">2,853</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Active Students</h3>
          </div>
          <div className="stat-value">2,420</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>With Pending Fees</h3>
          </div>
          <div className="stat-value">845</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>New Registrations</h3>
          </div>
          <div className="stat-value">124</div>
          <div className="stat-footer">This month</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
            All Students
          </button>
          <button className={activeTab === "active" ? "active" : ""} onClick={() => setActiveTab("active")}>
            Active
          </button>
          <button className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>
            Pending Payments
          </button>
          <button className={activeTab === "inactive" ? "active" : ""} onClick={() => setActiveTab("inactive")}>
            Inactive
          </button>
        </div>
      </div>

      {/* Student table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Program</th>
              <th>Level</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>
                  <div className="student-cell">
                    <div>{student.name}</div>
                    <div className="student-id">{student.email}</div>
                  </div>
                </td>
                <td>{student.program}</td>
                <td>{student.level}</td>
                <td>
                  <span className={`status-badge ${student.status}`}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${student.paymentStatus}`}>
                    {student.paymentStatus.charAt(0).toUpperCase() + student.paymentStatus.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" onClick={() => openViewModal(student)}>👁️</button>
                    <button className="action-btn edit" onClick={() => openEditModal(student)}>✏️</button>
                    <button className="action-btn delete" onClick={() => deleteStudent(student.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled>Previous</button>
        <span className="page-info">Page 1 of 1</span>
        <button disabled>Next</button>
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Add New Student</h2>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
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
              
              <div className="form-row">
                <div className="form-group">
                  <label>Program</label>
                  <select 
                    name="program" 
                    value={formData.program} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Program</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Telecommunications Engineering">Telecommunications Engineering</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Level</label>
                  <select 
                    name="level" 
                    value={formData.level} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="Level 100">Level 100</option>
                    <option value="Level 200">Level 200</option>
                    <option value="Level 300">Level 300</option>
                    <option value="Level 400">Level 400</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
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
                
                <div className="form-group">
                  <label>Payment Status</label>
                  <select 
                    name="paymentStatus" 
                    value={formData.paymentStatus} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {isViewModalOpen && selectedStudent && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Student Details</h2>
              <button className="modal-close-btn" onClick={() => setIsViewModalOpen(false)}>✕</button>
            </div>
            
            <div className="student-profile">
              <div className="profile-header">
                <div className="avatar">{selectedStudent.name.charAt(0)}</div>
                <div>
                  <h3>{selectedStudent.name}</h3>
                  <p>{selectedStudent.email}</p>
                </div>
              </div>
              
              <div className="student-details">
                <div className="detail-item">
                  <span className="detail-label">Student ID:</span>
                  <span>{selectedStudent.id}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Program:</span>
                  <span>{selectedStudent.program}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Level:</span>
                  <span>{selectedStudent.level}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Account Status:</span>
                  <span className={`status-badge ${selectedStudent.status}`}>
                    {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                  </span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Payment Status:</span>
                  <span className={`status-badge ${selectedStudent.paymentStatus}`}>
                    {selectedStudent.paymentStatus.charAt(0).toUpperCase() + selectedStudent.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer single">
              <button className="primary-btn" onClick={() => {
                setIsViewModalOpen(false)
                openEditModal(selectedStudent)
              }}>
                Edit Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {isEditModalOpen && selectedStudent && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Edit Student</h2>
              <button className="modal-close-btn" onClick={() => setIsEditModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
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
              
              <div className="form-row">
                <div className="form-group">
                  <label>Program</label>
                  <select 
                    name="program" 
                    value={formData.program} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Telecommunications Engineering">Telecommunications Engineering</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Level</label>
                  <select 
                    name="level" 
                    value={formData.level} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Level 100">Level 100</option>
                    <option value="Level 200">Level 200</option>
                    <option value="Level 300">Level 300</option>
                    <option value="Level 400">Level 400</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
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
                
                <div className="form-group">
                  <label>Payment Status</label>
                  <select 
                    name="paymentStatus" 
                    value={formData.paymentStatus} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
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

export default Students