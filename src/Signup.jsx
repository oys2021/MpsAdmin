
// import React, { useState } from 'react';
// import "./styles/Signup.css"

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your signup logic here
//     console.log('Signup data:', formData);
//   };

//   return (
//     <div className="signup-page">
//       {/* Left Sidebar with Image */}
//       <div className="sidebar">
//         <div className="sidebar-content">
//           <div className="logo">$</div>
//           <h2>MobilePay</h2>
//           <p>Send and receive money with just a phone number</p>
//           <div className="features">
//             <div className="feature">
//               <span className="icon">✓</span>
//               <span>Instant transfers</span>
//             </div>
//             <div className="feature">
//               <span className="icon">✓</span>
//               <span>No transaction fees</span>
//             </div>
//             <div className="feature">
//               <span className="icon">✓</span>
//               <span>Bank-level security</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Signup Form */}
//       <div className="signup-container">
//         <div className="form-header">
//           <h1>Signin  Account</h1>
//           <p>Sign in to start using mobile payments</p>
//         </div>

//         <form onSubmit={handleSubmit}>

//           <div className="input-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="john@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               minLength="8"
//             />
//           </div>

//           <div className="input-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               placeholder="••••••••"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit" className="signup-btn">
//             Sign Account
//           </button>
//         </form>

//         <div className="footer">
         
//           <div className="terms">
//             By signing up, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;