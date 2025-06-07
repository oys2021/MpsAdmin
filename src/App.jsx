import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Dashboard from "./components/Dashboard"
import Students from "./pages/Students"
import Admins from "./pages/Admins"
import Transactions from "./pages/Transactions"
import PaymentHistory from "./pages/PaymentHistory"
import Login from "./Login"





function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login/>} />

        {/* <Route path="/signup" element={<Signup />} /> */}

        <Route path="/" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="students" element={<Students />} />
          <Route path="admins" element={<Admins />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="payment-history" element={<PaymentHistory />} />
          {/* ... other nested routes */}
        </Route>

        {/* Optional: 404 fallback */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  )
}

// Dashboard Home Component
function DashboardHome() {
  return (
    <div className="dashboard-home">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome to the GCTU Mobile Payment Application System dashboard.</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Students</h3>
            <span className="icon">👥</span>
          </div>
          <div className="stat-value">2,853</div>
          <div className="stat-footer">+12% from last month</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Revenue</h3>
            <span className="icon">💰</span>
          </div>
          <div className="stat-value">GH₵ 458,623.00</div>
          <div className="stat-footer">+20.1% from last month</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Pending Payments</h3>
            <span className="icon">⏳</span>
          </div>
          <div className="stat-value">GH₵ 125,430.00</div>
          <div className="stat-footer">-4% from last month</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Active Users</h3>
            <span className="icon">👤</span>
          </div>
          <div className="stat-value">1,234</div>
          <div className="stat-footer">+18% from last month</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <div className="chart-header">
            <h2>Payment Overview</h2>
            <p>Monthly payment trends for the current academic year</p>
          </div>
          <div className="chart-body">
            <BarChart />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h2>Payment Methods</h2>
            <p>Distribution of payment methods</p>
          </div>
          <div className="chart-body">
            <PieChart />
          </div>
        </div>
      </div>

      <div className="recent-transactions">
        <div className="section-header">
          <h2>Recent Transactions</h2>
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TR-7245</td>
                <td>
                  <div className="student-cell">
                    <div>John Doe</div>
                    <div className="student-id">20210001</div>
                  </div>
                </td>
                <td>Tuition Fee</td>
                <td>GH₵ 850.00</td>
                <td>2025-01-15</td>
                <td>
                  <span className="status-badge completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td>TR-7244</td>
                <td>
                  <div className="student-cell">
                    <div>Mary Smith</div>
                    <div className="student-id">20210042</div>
                  </div>
                </td>
                <td>Hostel Fee</td>
                <td>GH₵ 500.00</td>
                <td>2025-01-15</td>
                <td>
                  <span className="status-badge completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td>TR-7243</td>
                <td>
                  <div className="student-cell">
                    <div>David Mensah</div>
                    <div className="student-id">20210078</div>
                  </div>
                </td>
                <td>Library Fee</td>
                <td>GH₵ 150.00</td>
                <td>2025-01-14</td>
                <td>
                  <span className="status-badge pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>TR-7242</td>
                <td>
                  <div className="student-cell">
                    <div>Sarah Addo</div>
                    <div className="student-id">20210036</div>
                  </div>
                </td>
                <td>Sports Fee</td>
                <td>GH₵ 75.00</td>
                <td>2025-01-14</td>
                <td>
                  <span className="status-badge completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td>TR-7241</td>
                <td>
                  <div className="student-cell">
                    <div>Michael Owusu</div>
                    <div className="student-id">20210015</div>
                  </div>
                </td>
                <td>Tuition Fee</td>
                <td>GH₵ 1,250.00</td>
                <td>2025-01-13</td>
                <td>
                  <span className="status-badge failed">Failed</span>
                </td>
              </tr>
            </tbody>
          </table>
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
          <span>Jan</span>
        </div>
        <div className="chart-bar" style={{ height: "80%" }}>
          <span>Feb</span>
        </div>
        <div className="chart-bar" style={{ height: "65%" }}>
          <span>Mar</span>
        </div>
        <div className="chart-bar" style={{ height: "90%" }}>
          <span>Apr</span>
        </div>
        <div className="chart-bar" style={{ height: "50%" }}>
          <span>May</span>
        </div>
        <div className="chart-bar" style={{ height: "70%" }}>
          <span>Jun</span>
        </div>
        <div className="chart-bar" style={{ height: "55%" }}>
          <span>Jul</span>
        </div>
        <div className="chart-bar" style={{ height: "85%" }}>
          <span>Aug</span>
        </div>
        <div className="chart-bar" style={{ height: "75%" }}>
          <span>Sep</span>
        </div>
        <div className="chart-bar" style={{ height: "45%" }}>
          <span>Oct</span>
        </div>
        <div className="chart-bar" style={{ height: "50%" }}>
          <span>Nov</span>
        </div>
        <div className="chart-bar" style={{ height: "60%" }}>
          <span>Dec</span>
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
        <div className="pie-segment" style={{ "--percentage": "65%", "--color": "#0B2447" }}></div>
        <div className="pie-segment" style={{ "--percentage": "25%", "--color": "#FFCC00" }}></div>
        <div className="pie-segment" style={{ "--percentage": "10%", "--color": "#19A7CE" }}></div>
      </div>
      <div className="pie-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "#0B2447" }}></span>
          <span>Mobile Money (65%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "#FFCC00" }}></span>
          <span>Bank Transfer (25%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "#19A7CE" }}></span>
          <span>Credit Card (10%)</span>
        </div>
      </div>
    </div>
  )
}

export default App
