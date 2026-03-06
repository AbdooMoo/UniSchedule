import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import Students from "./Students";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const [studentsList, setStudentsList] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents
      ? JSON.parse(savedStudents)
      : [
          {
            id: "2227349",
            name: "Samaa Magdy",
            email: "samaa@uni.edu",
            dept: "Computer Science",
            status: "Active",
            date: "2023-10-01",
          },
          {
            id: "2227158",
            name: "Shahy Samy",
            email: "shahy@uni.edu",
            dept: "Mathematics",
            status: "Active",
            date: "2023-10-05",
          },
          {
            id: "2227842",
            name: "Abdo Mohammed",
            email: "abdo@uni.edu",
            dept: "Physics",
            status: "Active",
            date: "2023-10-10",
          },
          {
            id: "2227563",
            name: "Nouran Abdo",
            email: "nouran@uni.edu",
            dept: "IT",
            status: "Inactive",
            date: "2023-10-12",
          },
          {
            id: "2227910",
            name: "Ahmed Ali",
            email: "ahmed@uni.edu",
            dept: "IS",
            status: "Active",
            date: "2023-10-15",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(studentsList));
  }, [studentsList]);

  const [activities, setActivities] = useState(() => {
    const savedActions = localStorage.getItem("recent_activities");
    return savedActions
      ? JSON.parse(savedActions)
      : [
          {
            id: 1,
            title: "System Started",
            name: "Dashboard Initialized",
            time: "Just now",
            icon: "fa-check",
            color: "add-bg",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("recent_activities", JSON.stringify(activities));
  }, [activities]);

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="logo-section">
          <div className="logo-wrapper">
            <i className="fa-solid fa-graduation-cap logo-icon"></i>
            <h2 className="logo-text">UniSchedule</h2>
          </div>
          <span className="admin-subtext">Admin Panel</span>
        </div>
        <hr className="sidebar-divider" />

        <button
          className={`sidebar-btn ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => setActivePage("dashboard")}
        >
          <i className="fa-solid fa-chart-pie"></i> Dashboard
        </button>

        <nav className="nav-menu">
          <p className="nav-label">Management</p>

          <button
            className={`sidebar-btn ${activePage === "students" ? "active" : ""}`}
            onClick={() => setActivePage("students")}
          >
            <i className="fa-solid fa-user-graduate"></i>
            <span>Students</span>
          </button>

          <button
            className={`sidebar-btn ${activePage === "instructors" ? "active" : ""}`}
            onClick={() => setActivePage("instructors")}
          >
            <i className="fa-solid fa-chalkboard-user"></i>
            <span>Instructors</span>
          </button>

          <button
            className={`sidebar-btn ${activePage === "courses" ? "active" : ""}`}
            onClick={() => setActivePage("courses")}
          >
            <i className="fa-solid fa-book"></i>
            <span>Courses</span>
          </button>

          <button
            className={`sidebar-btn ${activePage === "rooms" ? "active" : ""}`}
            onClick={() => setActivePage("rooms")}
          >
            <i className="fa-solid fa-door-open"></i>
            <span>Rooms</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="admin-avatar">
              <span>A</span>
            </div>
            <div className="admin-info">
              <p className="admin-name">Ahmed Ali</p>
              <p className="admin-role">Super Admin</p>
            </div>
            <button className="settings-icon-btn">
              <i className="fa-solid fa-gear"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="admin-main">
        <div className="topbar">
          <div className="page-info">
            <span className="breadcrumb-path">UniSchedule / </span>
            <span className="breadcrumb-current">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
            </span>
          </div>

          <div className="status-container">
            <div className="system-status">
              <span className="status-dot"></span>
              System Online
            </div>
            <div className="logout-section">
              <button className="logout-btn" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {activePage === "dashboard" && (
            <div className="dashboard-view">
              <div className="view-header">
                <h2>Dashboard Overview</h2>
                <p>Welcome back! Here's what's happening today.</p>
              </div>

              <div className="cards-grid">
                <div className="stat-card">
                  <div className="card-icon student-bg">
                    <i className="fa-solid fa-user-graduate"></i>
                  </div>
                  <div className="card-info">
                    <p>Total Students</p>
                    <h3>1,240</h3>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="card-icon instructor-bg">
                    <i className="fa-solid fa-chalkboard-user"></i>
                  </div>
                  <div className="card-info">
                    <p>Total Instructors</p>
                    <h3>84</h3>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="card-icon course-bg">
                    <i className="fa-solid fa-book-open"></i>
                  </div>
                  <div className="card-info">
                    <p>Total Courses</p>
                    <h3>42</h3>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="card-icon room-bg">
                    <i className="fa-solid fa-door-open"></i>
                  </div>
                  <div className="card-info">
                    <p>Total Rooms</p>
                    <h3>18</h3>
                  </div>
                </div>
              </div>

              <div className="recent-activity-section">
                <div className="section-header">
                  <h3>Recently Activity</h3>
                  <button className="view-all-btn">View all</button>
                </div>

                <div className="activity-list">
                  {activities.map((act) => (
                    <div className="activity-item" key={act.id}>
                      <div className="activity-info">
                        <div className={`activity-icon ${act.color}`}>
                          <i className={`fa-solid ${act.icon}`}></i>
                        </div>
                        <div className="activity-details">
                          <p className="activity-title">{act.title}</p>
                          <p className="activity-name">{act.name}</p>
                        </div>
                      </div>
                      <span className="activity-time">{act.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activePage === "students" && (
            <Students
              students={studentsList}
              setStudents={setStudentsList}
              setActivities={setActivities}
              activities={activities}
            />
          )}
        </div>
      </div>
    </div>
  );
}
