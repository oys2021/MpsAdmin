"use client"

import { useState } from "react"
import "../styles/Pages.css"

function Transactions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock transaction data
  const transactions = [
    {
      id: "TR-7245",
      student: "John Doe",
      studentId: "20210001",
      amount: 850.0,
      type: "Tuition Fee",
      date: "2025-01-15",
      time: "14:30:22",
      method: "Mobile Money",
      status: "completed",
      reference: "MPAS-7245-JD",
    },
    {
      id: "TR-7244",
      student: "Mary Smith",
      studentId: "20210042",
      amount: 500.0,
      type: "Hostel Fee",
      date: "2025-01-15",
      time: "12:15:45",
      method: "Bank Transfer",
      status: "completed",
      reference: "MPAS-7244-MS",
    },
    {
      id: "TR-7243",
      student: "David Mensah",
      studentId: "20210078",
      amount: 150.0,
      type: "Library Fee",
      date: "2025-01-14",
      time: "09:22:10",
      method: "Mobile Money",
      status: "pending",
      reference: "MPAS-7243-DM",
    },
    {
      id: "TR-7242",
      student: "Sarah Addo",
      studentId: "20210036",
      amount: 75.0,
      type: "Sports Fee",
      date: "2025-01-14",
      time: "16:45:33",
      method: "Credit Card",
      status: "completed",
      reference: "MPAS-7242-SA",
    },
    {
      id: "TR-7241",
      student: "Michael Owusu",
      studentId: "20210015",
      amount: 1250.0,
      type: "Tuition Fee",
      date: "2025-01-13",
      time: "11:05:18",
      method: "Mobile Money",
      status: "failed",
      reference: "MPAS-7241-MO",
    },
    {
      id: "TR-7240",
      student: "Grace Appiah",
      studentId: "20210089",
      amount: 300.0,
      type: "Hostel Fee",
      date: "2025-01-13",
      time: "10:12:55",
      method: "Bank Transfer",
      status: "completed",
      reference: "MPAS-7240-GA",
    },
    {
      id: "TR-7239",
      student: "Emmanuel Osei",
      studentId: "20210054",
      amount: 450.0,
      type: "Tuition Fee",
      date: "2025-01-12",
      time: "14:30:22",
      method: "Mobile Money",
      status: "completed",
      reference: "MPAS-7239-EO",
    },
    {
      id: "TR-7238",
      student: "Abigail Boateng",
      studentId: "20210023",
      amount: 200.0,
      type: "Library Fee",
      date: "2025-01-12",
      time: "09:45:11",
      method: "Credit Card",
      status: "pending",
      reference: "MPAS-7238-AB",
    },
  ]

  // Filter transactions based on search term and active tab
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "completed") return matchesSearch && transaction.status === "completed"
    if (activeTab === "pending") return matchesSearch && transaction.status === "pending"
    if (activeTab === "failed") return matchesSearch && transaction.status === "failed"

    return matchesSearch
  })

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-left">
          <h1>Transactions</h1>
          <p>View and manage all payment transactions in the system.</p>
        </div>
        <div className="header-right">
          <button className="primary-btn">
            <span>📥</span> Export
          </button>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>🔍</button>
        </div>
        <div className="filter-options">
          <select>
            <option value="">All Payment Types</option>
            <option value="Tuition Fee">Tuition Fee</option>
            <option value="Hostel Fee">Hostel Fee</option>
            <option value="Library Fee">Library Fee</option>
            <option value="Sports Fee">Sports Fee</option>
          </select>
          <select>
            <option value="">All Payment Methods</option>
            <option value="Mobile Money">Mobile Money</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit Card">Credit Card</option>
          </select>
          <select>
            <option value="">Date Range</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Transactions</h3>
          </div>
          <div className="stat-value">12,546</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Amount</h3>
          </div>
          <div className="stat-value">GH₵ 458,623.00</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Success Rate</h3>
          </div>
          <div className="stat-value">94.2%</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Today's Transactions</h3>
          </div>
          <div className="stat-value">124</div>
          <div className="stat-footer">GH₵ 15,430.00</div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
            All Transactions
          </button>
          <button className={activeTab === "completed" ? "active" : ""} onClick={() => setActiveTab("completed")}>
            Completed
          </button>
          <button className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>
            Pending
          </button>
          <button className={activeTab === "failed" ? "active" : ""} onClick={() => setActiveTab("failed")}>
            Failed
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Student</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date & Time</th>
              <th>Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>
                  <div className="student-cell">
                    <div>{transaction.student}</div>
                    <div className="student-id">{transaction.studentId}</div>
                  </div>
                </td>
                <td>{transaction.type}</td>
                <td>GH₵ {transaction.amount.toFixed(2)}</td>
                <td>
                  <div className="date-cell">
                    <div>{transaction.date}</div>
                    <div className="time">{transaction.time}</div>
                  </div>
                </td>
                <td>{transaction.method}</td>
                <td>
                  <span className={`status-badge ${transaction.status}`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view">👁️</button>
                    <button className="action-btn receipt">🧾</button>
                    {transaction.status === "pending" && <button className="action-btn refresh">🔄</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled>Previous</button>
        <span className="page-info">Page 1 of 1</span>
        <button disabled>Next</button>
      </div>
    </div>
  )
}

export default Transactions
