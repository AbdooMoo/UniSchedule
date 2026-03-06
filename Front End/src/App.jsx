// import { useState } from 'react';

// import './App.css';


// function App() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
  

//   
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//  
//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Login successful!");
//         console.log("Token:", data.token);
//       } else {
//         alert("Error: " + data.message);
//       }
//     } catch (error) {
//       console.error("Server connection error:", error);
//       alert("Could not connect to the server.");
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className="left-panel">
//         <div className="brand-header">
//           <div className="logo-box">
//             <i className="fa-regular fa-calendar-days"></i>
//           </div>
//           <h1>UniSchedule</h1>
//         </div>
//         <p className="brand-desc">
//           An advanced Timetable Generator that eliminates scheduling conflicts
//           and intelligently optimizes your academic experience.
//         </p>

//         <div className="timetable-grid">
//           <div className="grid-cell header"></div>
//           <div className="grid-cell header">Sat</div>
//           <div className="grid-cell header">Sun</div>
//           <div className="grid-cell header">Mon</div>
//           <div className="grid-cell header">Tue</div>
//           <div className="grid-cell header">Wed</div>

//           {[8, 9, 10, 11, 12, 1, 2, 3, 4].map((time, index) => (
//             <div 
//               key={time} 
//               className="grid-cell time" 
//               style={{ gridRow: index + 2, gridColumn: 1 }}
//             >
//               {time}:00
//             </div>
//           ))}

//          
//           <div className="course-block c-light" style={{ gridColumn: 2, gridRow: "2 / 4" }}>CS 303 (ن)</div>
//           <div className="course-block c-light" style={{ gridColumn: 2, gridRow: "8 / 10" }}>CS 303 (ع)</div>
//           <div className="course-block c-light" style={{ gridColumn: 3, gridRow: "4 / 6" }}>CS 306 (ن)</div>
//           <div className="course-block c-dark" style={{ gridColumn: 3, gridRow: "6 / 8" }}>CS 308 (ن)</div>
//           <div className="course-block c-dark" style={{ gridColumn: 4, gridRow: "2 / 4" }}>CS 308 (ع)</div>
//           <div className="course-block c-dark" style={{ gridColumn: 4, gridRow: "6 / 8" }}>CS 317 (ن)</div>
//           <div className="course-block c-dark" style={{ gridColumn: 4, gridRow: "8 / 10" }}>CS 316 (ن)</div>
//           <div className="course-block c-light" style={{ gridColumn: 5, gridRow: "2 / 4" }}>CS 305 (ن)</div>
//           <div className="course-block c-light" style={{ gridColumn: 5, gridRow: "5 / 7" }}>CS 306 (ع)</div>
//           <div className="course-block c-light" style={{ gridColumn: 6, gridRow: "2 / 4" }}>CS 305 (ع)</div>
//           <div className="course-block c-dark" style={{ gridColumn: 6, gridRow: "4 / 6" }}>CS 317 (ع)</div>
//           <div className="course-block c-dark" style={{ gridColumn: 6, gridRow: "8 / 10" }}>CS 316 (ع)</div>
//         </div>

//         <div className="feature-tags">
//           <span className="tag"><i className="fa-regular fa-calendar-check"></i> Conflict-Free</span>
//           <span className="tag"><i className="fa-solid fa-arrows-rotate"></i> Real-Time Sync</span>
//           <span className="tag"><i className="fa-regular fa-lightbulb"></i> Smart Suggestions</span>
//         </div>
//       </div>


//       <div className="right-panel">
//         <div className="login-header">
//           <h2>Welcome back</h2>
//           <p>Sign in to your account to access your timetable and manage your schedule.</p>
//         </div>

//         <form id="login-form" onSubmit={handleLogin}>
//           <div className="input-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="you@university.edu"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <div className="label-with-link">
//               <label htmlFor="password">Password</label>
//               <a href="#" className="forgot-password">Forgot password?</a>
//             </div>
//             <div className="password-wrapper">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <i 
//                 className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
//                 onClick={togglePasswordVisibility}
//                 style={{ cursor: 'pointer' }}
//               ></i>
//             </div>
//           </div>

//           <div className="keep-signed-in">
//             <input type="checkbox" id="keep" />
//             <label htmlFor="keep">Keep me signed in</label>
//           </div>

//           <button type="submit" className="sign-in-btn">
//             Sign In <span>&rarr;</span>
//           </button>
//         </form>
        
//         <p className="request-access">
//           Don't have an account? <a href="#">Request Access</a>
//         </p>
//         <p className="terms-text">
//           By signing in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Student";
import Instructors from "./pages/Instructor";
import Rooms from "./pages/Rooms";
import Courses from "./pages/Courses";
import Admins from "./pages/Admin";
import "./App.css";



function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admins" element={<Admins />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;