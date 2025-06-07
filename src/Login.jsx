"use client"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const API_BASE_URL = 'http://192.168.43.192:8080'; 

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setIsLoading(true);
  setLoginError("");

 try {
  const response = await fetch(`${API_BASE_URL}/api/users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: formData.email,
      password: formData.password,
      role: "admin"
    })
  });

  const data = await response.json();

  console.log("Server response:", data); // ✅ Proper case for console

  if (!response.ok) {
    let errorMessage = "Login failed.";
    if (typeof data === "object") {
      // Show first serializer error field message if exists
      const firstKey = Object.keys(data)[0];
      errorMessage = Array.isArray(data[firstKey])
        ? data[firstKey][0]
        : data[firstKey];
    }
    setLoginError(errorMessage);
  } else {
    // Login success
    localStorage.setItem("accessToken", data.tokens.access); // Your endpoint uses `tokens.access`
    localStorage.setItem("refreshToken", data.tokens.refresh);

    if (formData.rememberMe) {
      localStorage.setItem("rememberMe", "true");
    }

    navigate("/");
  }
} catch (error) {
  console.error("Network error:", error);
  setLoginError("An error occurred. Please try again later.");
} finally {
  setIsLoading(false);
}


  
};


  return (
  
    <div className="login-container">
      <div className="login-background">
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
        <div className="background-shape shape-3"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <div className="logo-icon">
             <img
  src="./src/assets/gctu.jpeg"
  alt="GCTU Badge"
  width="170"
  height="auto"
/>


            </div>
            <div className="logo-text">
              <span>GCTU Payment System</span>
              <span>Administration Portal</span>
            </div>
          </div>
          <h2>Sign in to your account</h2>
          <p>Enter your credentials to access the dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {loginError && (
            <div className="login-error">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#721C24"/>
              </svg>
              <span>{loginError}</span>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <div className="input-container">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3333 3.33334H1.66667C0.75 3.33334 0.00833334 4.08334 0.00833334 5.00001L0 15C0 15.9167 0.75 16.6667 1.66667 16.6667H18.3333C19.25 16.6667 20 15.9167 20 15V5.00001C20 4.08334 19.25 3.33334 18.3333 3.33334ZM18.3333 15H1.66667V6.66668L10 11.6667L18.3333 6.66668V15ZM10 10L1.66667 5.00001H18.3333L10 10Z" fill="#5a6b87"/>
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? "input-error" : ""}
              />
            </div>
            {errors.email && <div className="error-message">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C3.588 0 0 3.588 0 8C0 12.412 3.588 16 8 16C12.412 16 16 12.412 16 8C16 3.588 12.412 0 8 0ZM8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14Z" fill="#ff708b"/>
                <path d="M9 12H7V7H9V12ZM9 5H7V3H9V5Z" fill="#ff708b"/>
              </svg>
              <span>{errors.email}</span>
            </div>}
          </div>
          
          <div className="form-group">
            <div className="password-label">
              <label htmlFor="password">Password</label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            <div className="input-container">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 7.5H14.1667V5.83333C14.1667 2.9925 11.8417 0.666667 9 0.666667C6.15833 0.666667 3.83333 2.9925 3.83333 5.83333V7.5H3C1.625 7.5 0.5 8.625 0.5 10V16.6667C0.5 18.0417 1.625 19.1667 3 19.1667H15C16.375 19.1667 17.5 18.0417 17.5 16.6667V10C17.5 8.625 16.375 7.5 15 7.5ZM9 14.1667C7.625 14.1667 6.5 13.0417 6.5 11.6667C6.5 10.2917 7.625 9.16667 9 9.16667C10.375 9.16667 11.5 10.2917 11.5 11.6667C11.5 13.0417 10.375 14.1667 9 14.1667ZM12.3333 7.5H5.66667V5.83333C5.66667 4.075 7.24167 2.5 9 2.5C10.7583 2.5 12.3333 4.075 12.3333 5.83333V7.5Z" fill="#5a6b87"/>
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? "input-error" : ""}
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                
              </button>
            </div>
            {errors.password && <div className="error-message">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C3.588 0 0 3.588 0 8C0 12.412 3.588 16 8 16C12.412 16 16 12.412 16 8C16 3.588 12.412 0 8 0ZM8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14Z" fill="#ff708b"/>
                <path d="M9 12H7V7H9V12ZM9 5H7V3H9V5Z" fill="#ff708b"/>
              </svg>
              <span>{errors.password}</span>
            </div>}
          </div>
          
          <div className="form-group remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                Sign in
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.29 10.7L9.29 15.7C9.1 15.89 8.84 16 8.58 16C8.32 16 8.06 15.89 7.87 15.7C7.48 15.31 7.48 14.68 7.87 14.29L11.17 11H5C4.45 11 4 10.55 4 10C4 9.45 4.45 9 5 9H11.17L7.88 5.71C7.49 5.32 7.49 4.69 7.88 4.3C8.27 3.91 8.9 3.91 9.29 4.3L14.29 9.3C14.68 9.69 14.68 10.32 14.29 10.71V10.7Z" fill="white"/>
                </svg>
              </>
            )}
          </button>
        </form>
        
        {/* <div className="social-login">
          <p>Or sign in with</p>
          <div className="social-buttons">
            <button className="social-btn google">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.1712 8.36783H17.5V8.33325H10V11.6666H14.7095C14.0225 13.6078 12.1762 15.0001 10 15.0001C7.23875 15.0001 5 12.7614 5 10.0001C5 7.23883 7.23875 5.00008 10 5.00008C11.2745 5.00008 12.4345 5.48091 13.317 6.26641L15.6745 3.90891C14.1858 2.52283 12.195 1.66675 10 1.66675C5.39833 1.66675 1.66666 5.39841 1.66666 10.0001C1.66666 14.6017 5.39833 18.3334 10 18.3334C14.6017 18.3334 18.3333 14.6017 18.3333 10.0001C18.3333 9.44141 18.2758 8.89591 18.1712 8.36783Z" fill="#FFC107"/>
                <path d="M2.62744 6.12158L5.36536 8.12958C6.10619 6.29508 7.90036 5.00008 9.99994 5.00008C11.2744 5.00008 12.4344 5.48091 13.317 6.26641L15.6744 3.90891C14.1858 2.52283 12.1949 1.66675 9.99994 1.66675C6.79911 1.66675 4.02327 3.47425 2.62744 6.12158Z" fill="#FF3D00"/>
                <path d="M10.0001 18.3333C12.1526 18.3333 14.1084 17.5096 15.5871 16.17L13.0084 13.9875C12.1434 14.6458 11.0867 15.0017 10.0001 15C7.83258 15 5.99208 13.6179 5.29883 11.6892L2.5813 13.7829C3.9613 16.4817 6.7613 18.3333 10.0001 18.3333Z" fill="#4CAF50"/>
                <path d="M18.1712 8.36792H17.5V8.33334H10V11.6667H14.7095C14.3809 12.5903 13.789 13.3973 13.0067 13.9883L13.0079 13.9875L15.5867 16.17C15.4042 16.335 18.3333 14.1667 18.3333 10.0001C18.3333 9.44142 18.2758 8.89592 18.1712 8.36792Z" fill="#1976D2"/>
              </svg>
              Google
            </button>
            <button className="social-btn microsoft">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H9.5V9.5H1V1Z" fill="#F1511B"/>
                <path d="M10.5 1H19V9.5H10.5V1Z" fill="#80CC28"/>
                <path d="M1 10.5H9.5V19H1V10.5Z" fill="#00ADEF"/>
                <path d="M10.5 10.5H19V19H10.5V10.5Z" fill="#FBBC09"/>
              </svg>
              Microsoft
            </button>
          </div>
        </div> */}
        
        <div className="login-footer">
          <p>© 2023 GCTU Payment System. All rights reserved.</p>
          <div className="support">
            <span>Need help?</span>
            <a href="mailto:support@gctu.edu.gh">Contact support</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;