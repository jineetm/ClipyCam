// import React, { useState } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import jwtDecode from 'jwt-decode';

// function LoginView() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleGoogleLoginSuccess = async (credentialResponse) => {
//     try {
//       const token = credentialResponse.credential;
  
//       if (!token) {
//         console.error('No token received from Google');
//         alert('Failed to retrieve Google token');
//         return;
//       }
  
//       console.log('Google Token:', token);
  
//       // Send the token to the backend
//       const response = await fetch('http://localhost:3001/auth/google', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         console.log('Backend Response:', data);
//         alert(`Welcome, ${data.user.first_name}`);
//       } else {
//         console.error('Backend Error:', data.error);
//         alert(data.error || 'Sign-In failed');
//       }
//     } catch (error) {
//       console.error('Error during Google Login:', error.message);
//       alert('An error occurred during Google Login');
//     }
//   };
  
//   const handleGoogleLoginError = () => {
//     console.error('Google Login Failed');
//     setError('Google Login Failed');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your manual login logic here
//     console.log('Email:', email);
//     console.log('Password:', password);
//   };

//   return (
//     <div style={{ margin: '50px' }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div style={{ marginTop: '20px' }}>
//         <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
//       </div>
//     </div>
//   );
// }

// export default LoginView;


import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import LoginViewModel from "../viewmodels/LoginViewModel";
import './LoginView.css';


function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      if (!token) {
        console.error("No token received from Google");
        alert("Failed to retrieve Google token");
        return;
      }

      console.log("Google Token:", token);

      // Send the token to the backend
      const response = await fetch("http://localhost:3001/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Backend Response:", data);
        alert(`Welcome, ${data.user.first_name}`);
      } else {
        console.error("Backend Error:", data.error);
        alert(data.error || "Sign-In failed");
      }
    } catch (error) {
      console.error("Error during Google Login:", error.message);
      alert("An error occurred during Google Login");
    }
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login Failed");
    setError("Google Login Failed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccessMessage("");

    // Front-end Validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    try {
      // Call LoginViewModel for backend validation
      const result = await LoginViewModel.login(email, password);

      if (result.success) {
        setSuccessMessage("Login successful! Redirecting...");
        console.log("User data:", result.data);
        // Redirect logic (e.g., navigate to the dashboard)
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Please enter your details</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-section">
            <label>
              <input type="checkbox" /> Remember for 30 days
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>
          {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="login-button">
            Sign in
          </button>
        </form>
        <div className="divider">or</div>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => setError("Google Login Failed")}
        />
        <p className="signup-text">
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginView;