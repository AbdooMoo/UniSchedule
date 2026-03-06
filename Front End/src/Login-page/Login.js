import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Signed in");
    navigate("/dashboard");
  };
  return (
    <div className="main-container">
      <div className="left-panel">
        <div className="brand-header">
          <div className="logo-box">
            <i className="fa-regular fa-calendar-days"></i>
          </div>
          <h1>UniSchedule</h1>
        </div>
        <p className="brand-desc">
          An advanced Timetable Generator that eliminates scheduling conflicts
          and intelligently optimizes your academic experience.
        </p>

        <div className="timetable-grid">
          <div className="grid-cell header"></div>
          <div className="grid-cell header">Sat</div>
          <div className="grid-cell header">Sun</div>
          <div className="grid-cell header">Mon</div>
          <div className="grid-cell header">Tue</div>
          <div className="grid-cell header">Wed</div>
          <div className="grid-cell header">Thurs</div>

          <div
            className="grid-cell time"
            style={{ gridRow: "2", gridColumn: "1" }}
          >
            8:00
          </div>
          <div
            className="grid-cell time"
            style={{ gridRow: "3", gridColumn: "1" }}
          >
            9:00
          </div>
          <div
            className="grid-cell time"
            style={{ gridRow: "4", gridColumn: "1" }}
          >
            10:00
          </div>
          <div
            className="grid-cell time"
            style={{ gridRow: "5", gridColumn: "1" }}
          >
            11:00
          </div>
          <div
            className="grid-cell time"
            style={{ gridRow: "6", gridColumn: "1" }}
          >
            12:00
          </div>
          <div
            className="grid-cell time"
            style={{ gridRow: "7", gridColumn: "1" }}
          >
            1:00
          </div>
          <div
            className="grid-cell time"
            style={{ gridRow: "8", gridColumn: "1" }}
          >
            2:00
          </div>
          <div
            className="grid-cell time"
            style={{ gridRow: "9", gridColumn: "1" }}
          >
            3:00
          </div>
          <div
            className="grid-cell time"
            style={{ gridRow: "10", gridColumn: "1" }}
          >
            4:00
          </div>

          <div
            className="course-block c-light"
            style={{ gridColumn: "2", gridRow: "2 / 4", "--order": 1 }}
          >
            CS 303 (ن)
          </div>
          <div
            className="course-block c-light"
            style={{ gridColumn: "2", gridRow: "8 / 10", "--order": 8 }}
          >
            CS 303 (ع)
          </div>
          <div
            className="course-block c-light"
            style={{ gridColumn: "3", gridRow: "4 / 6", "--order": 2 }}
          >
            CS 306 (ن)
          </div>
          <div
            className="course-block c-dark"
            style={{ gridColumn: "3", gridRow: "6 / 8", "--order": 7 }}
          >
            CS 308 (ن)
          </div>
          <div
            className="course-block c-dark"
            style={{ gridColumn: "4", gridRow: "2 / 4", "--order": 4 }}
          >
            CS 308 (ع)
          </div>
          <div
            className="course-block c-dark"
            style={{ gridColumn: "4", gridRow: "6 / 8", "--order": 5 }}
          >
            CS 317 (ن)
          </div>
          <div
            className="course-block c-light"
            style={{ gridColumn: "7", gridRow: "4 / 6", "--order": 12 }}
          >
            CS 301 (ن)
          </div>
          <div
            className="course-block c-light"
            style={{ gridColumn: "7", gridRow: "8 / 10", "--order": 13 }}
          >
            CS 301 (ع)
          </div>
          <div
            className="course-block c-dark"
            style={{ gridColumn: "7", gridRow: "6 / 8", "--order": 14 }}
          >
            CS 309 (ن)
          </div>
          <div
            className="course-block c-dark"
            style={{ gridColumn: "2", gridRow: "4 / 6", "--order": 5 }}
          >
            CS 309 (ع)
          </div>
          <div
            className="course-block c-dark"
            style={{ gridColumn: "4", gridRow: "8 / 10", "--order": 11 }}
          >
            CS 316 (ن)
          </div>
          <div
            className="course-block c-light"
            style={{ gridColumn: "5", gridRow: "2 / 4", "--order": 3 }}
          >
            CS 305 (ن)
          </div>
          <div
            className="course-block c-light"
            style={{ gridColumn: "5", gridRow: "5 / 7", "--order": 9 }}
          >
            CS 306 (ع)
          </div>
          <div
            className="course-block c-light"
            style={{ gridColumn: "6", gridRow: "2 / 4", "--order": 6 }}
          >
            CS 305 (ع)
          </div>
          <div
            className="course-block c-dark"
            style={{ gridColumn: "6", gridRow: "4 / 6", "--order": 6 }}
          >
            CS 317 (ع)
          </div>
          <div
            className="course-block c-dark"
            style={{ gridColumn: "6", gridRow: "8 / 10", "--order": 10 }}
          >
            CS 316 (ع)
          </div>
        </div>

        <div className="feature-tags">
          <span className="tag">
            <i className="fa-regular fa-calendar-check"></i> Conflict-Free
          </span>
          <span className="tag">
            <i className="fa-solid fa-arrows-rotate"></i> Real-Time Sync
          </span>
          <span className="tag">
            <i className="fa-regular fa-lightbulb"></i> Smart Suggestions
          </span>
        </div>
      </div>

      <div className="right-panel">
        <div className="login-header">
          <h2>Welcome back</h2>
          <p>
            Sign in to your account to access your timetable and manage your
            schedule.
          </p>
        </div>

        <form id="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@university.edu"
              required
            />
          </div>

          <div className="input-group">
            <div className="label-with-link">
              <label htmlFor="password">Password</label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                required
              />
              <i
                className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`}
                onClick={togglePassword}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>

          <div className="keep-signed-in">
            <input type="checkbox" id="keep" />
            <label htmlFor="keep">Keep me signed in</label>
          </div>

          <button type="submit" className="sign-in-btn">
            Sign In <span>&rarr;</span>
          </button>
        </form>

        <p className="request-access">
          Don't have an account? <a href="#">Request Access</a>
        </p>
        <p className="terms-text">
          By signing in, you agree to our <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
