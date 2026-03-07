import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/S_style.css';

const S_Dashboard = () => {
    const [isRegistrationOpen] = useState(false);
    const [studentName, setStudentName] = useState("Student");
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setStudentName(user.name);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
                   
                    <h2 style={{ margin: 0 }}>Student Portal</h2>
                </div>
                <nav>
                    <button title="Go to Home Page"><FaHome className="icon"/>Home</button>
                    <button style={{ opacity: 0.5 }} title="View Profile"><FaUser className="icon"/>Profile</button>
                    <button style={{ opacity: 0.5 }} title="View your class schedules"><FaCalendarAlt className="icon"/>My Schedule</button>
                    <button onClick={handleLogout}>
                        <FaSignOutAlt className="icon"/>Logout
                    </button>
                </nav>
            </div>
            <div className="main-content">
                <div className="background-overlay"></div>
                <header className="header">
                    <div className="welcome-msg">
                        <h1>Welcome back, {studentName}</h1>
                    </div>
                </header>

                {isRegistrationOpen ? (
                    <div className="schedule-table">
                        <h2>Your weekly Schedule</h2>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, paddingBottom: '50px' }}>
                        <div className="schedule-card">
                            <span className="status-icon">⏳</span>
                            <h3>Schedules Not Published</h3>
                            <p>
                                The registration period is currently closed. <br />
                                Please check back later when the administration publishes the finalized timetables.
                            </p>
                            <div className="status-badge">
                                Status: Preparation Mode
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default S_Dashboard;