"use client"

import { useState } from "react"
import "../styles/Pages.css"

function PaymentHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState("all")

  // Mock payment history data
  const paymentHistory = [
    {
      id: "PH-2025-001",
      academicYear: "2024/2025",
      semester: "First Semester",
      totalAmount: 458623.0,
      paidAmount: 325450.0,
      pendingAmount: 98750.0,
      startDate: "2024-09-01",
      endDate: "2024-12-15",
      status: "active",
    },
    {
      id: "PH-2024-002",
      academicYear: "2023/2024",
      semester: "Second Semester",
      totalAmount: 412580.0,
      paidAmount: 412580.0,
      pendingAmount: 0.0,
      startDate: "2024-01-15",
      endDate: "2024-05-30",
      status: "completed",
    },
    {
      id: "PH-2024-001",
      academicYear: "2023/2024",
      semester: "First Semester",
      totalAmount: 398750.0,
      paidAmount: 398750.0,
      pendingAmount: 0.0,
      startDate: "2023-09-01",
      endDate: "2023-12-15",
      status: "completed",
    },
    {
      id: "PH-2023-002",
      academicYear: "2022/2023",
      semester: "Second Semester",
      totalAmount: 375420.0,
      paidAmount: 375420.0,
      pendingAmount: 0.0,
      startDate: "2023-01-15",
      endDate: "2023-05-30",
      status: "completed",
    },
    {
      id: "PH-2023-001",
      academicYear: "2022/2023",
      semester: "First Semester",
      totalAmount: 362180.0,
      paidAmount: 362180.0,
      pendingAmount: 0.0,
      startDate: "2022-09-01",
      endDate: "2022-12-15",
      status: "completed",
    },
  ]

  // Filter payment history based on search term and date range
  const filteredPaymentHistory = paymentHistory.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.academicYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.semester.toLowerCase().includes(searchTerm.toLowerCase())

    if (dateRange === "all") return matchesSearch
    if (dateRange === "current") return matchesSearch && payment.status === "active"
    if (dateRange === "past") return matchesSearch && payment.status === "completed"

    return matchesSearch
  })

  // Mock payment details data
  const paymentDetails = [
    {
      id: "TR-7245",
      student: "John Doe",
      studentId: "20210001",
      amount: 850.0,
      type: "Tuition Fee",
      date: "2025-01-15",
      academicYear: "2024/2025",
      semester: "First Semester",
      status: "completed",
    },
    {
      id: "TR-7244",
      student: "Mary Smith",
      studentId: "20210042",
      amount: 500.0,
      type: "Hostel Fee",
      date: "2025-01-15",
      academicYear: "2024/2025",
      semester: "First Semester",
      status: "completed",
    },
    {
      id: "TR-7243",
      student: "David Mensah",
      studentId: "20210078",
      amount: 150.0,
      type: "Library Fee",
      date: "2025-01-14",
      academicYear: "2024/2025",
      semester: "First Semester",
      status: "pending",
    },
    {
      id: "TR-7242",
      student: "Sarah Addo",
      studentId: "20210036",
      amount: 75.0,
      type: "Sports Fee",
      date: "2025-01-14",
      academicYear: "2024/2025",
      semester: "First Semester",
      status: "completed",
    },
    {
      id: "TR-7241",
      student: "Michael Owusu",
      studentId: "20210015",
      amount: 1250.0,
      type: "Tuition Fee",
      date: "2025-01-13",
      academicYear: "2024/2025",
      semester: "First Semester",
      status: "failed",
    },
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-left">
          <h1>Payment History</h1>
          <p>View and analyze historical payment data and trends.</p>
        </div>
        <div className="header-right">
          <button className="primary-btn">
            <span>📥</span> Export Report
          </button>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search payment history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>🔍</button>
        </div>
        <div className="filter-options">
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="all">All Academic Years</option>
            <option value="current">Current Academic Year</option>
            <option value="past">Past Academic Years</option>
          </select>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Revenue</h3>
          </div>
          <div className="stat-value">GH₵ 458,623.00</div>
          <div className="stat-footer">Academic Year 2024/2025</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Tuition Fees</h3>
          </div>
          <div className="stat-value">GH₵ 325,450.00</div>
          <div className="stat-footer">71% of total revenue</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Hostel Fees</h3>
          </div>
          <div className="stat-value">GH₵ 98,750.00</div>
          <div className="stat-footer">22% of total revenue</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Other Fees</h3>
          </div>
          <div className="stat-value">GH₵ 34,423.00</div>
          <div className="stat-footer">7% of total revenue</div>
        </div>
      </div>

      <div className="section-header">
        <h2>Academic Year Payment History</h2>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Academic Year</th>
              <th>Semester</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
              <th>Pending Amount</th>
              <th>Period</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPaymentHistory.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.academicYear}</td>
                <td>{payment.semester}</td>
                <td>GH₵ {payment.totalAmount.toFixed(2)}</td>
                <td>GH₵ {payment.paidAmount.toFixed(2)}</td>
                <td>GH₵ {payment.pendingAmount.toFixed(2)}</td>
                <td>
                  <div className="date-cell">
                    <div>{payment.startDate}</div>
                    <div className="time">to {payment.endDate}</div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${payment.status}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view">👁️</button>
                    <button className="action-btn report">📊</button>
                    <button className="action-btn download">📥</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-header">
        <h2>Recent Payment Details</h2>
        <button className="view-all-btn">View All</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Student</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Academic Info</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>
                  <div className="student-cell">
                    <div>{payment.student}</div>
                    <div className="student-id">{payment.studentId}</div>
                  </div>
                </td>
                <td>{payment.type}</td>
                <td>GH₵ {payment.amount.toFixed(2)}</td>
                <td>{payment.date}</td>
                <td>
                  <div className="academic-cell">
                    <div>{payment.academicYear}</div>
                    <div className="semester">{payment.semester}</div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${payment.status}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <div className="chart-header">
            <h2>Payment Trends</h2>
            <p>Monthly payment trends for the current academic year</p>
          </div>
          <div className="chart-body">
            <BarChart />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h2>Fee Distribution</h2>
            <p>Breakdown of fee types</p>
          </div>
          <div className="chart-body">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  )
}

// Chart Components
function BarChart() {
  return (
    <div className="bar-chart-placeholder">
      {/* In a real implementation, you would use a library like Chart.js or Recharts */}
      <div className="chart-bars">
        <div className="chart-bar" style={{ height: "60%" }}>
          <span>Sep</span>
        </div>
        <div className="chart-bar" style={{ height: "80%" }}>
          <span>Oct</span>
        </div>
        <div className="chart-bar" style={{ height: "65%" }}>
          <span>Nov</span>
        </div>
        <div className="chart-bar" style={{ height: "90%" }}>
          <span>Dec</span>
        </div>
        <div className="chart-bar" style={{ height: "50%" }}>
          <span>Jan</span>
        </div>
        <div className="chart-bar" style={{ height: "70%" }}>
          <span>Feb</span>
        </div>
        <div className="chart-bar" style={{ height: "55%" }}>
          <span>Mar</span>
        </div>
        <div className="chart-bar" style={{ height: "85%" }}>
          <span>Apr</span>
        </div>
      </div>
    </div>
  )
}

function PieChart() {
  return (
    <div className="pie-chart-placeholder">
      {/* In a real implementation, you would use a library like Chart.js or Recharts */}
      <div className="pie-chart">
        <div className="pie-segment" style={{ "--percentage": "71%", "--color": "#0B2447" }}></div>
        <div className="pie-segment" style={{ "--percentage": "22%", "--color": "#FFCC00" }}></div>
        <div className="pie-segment" style={{ "--percentage": "7%", "--color": "#19A7CE" }}></div>
      </div>
      <div className="pie-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "#0B2447" }}></span>
          <span>Tuition Fees (71%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "#FFCC00" }}></span>
          <span>Hostel Fees (22%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "#19A7CE" }}></span>
          <span>Other Fees (7%)</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentHistory
