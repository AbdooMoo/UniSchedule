import React, { useState } from 'react';
import {FaHome,FaUser,FaCalendarAlt,FaSignOutAlt} from 'react-icons/fa';
import '../styles/S_style.css';
import logo from '../assets/logo.jpeg'; 


const S_Dashboard = () => {
    //
    const [isRegistrationOpen] = useState(false);

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
                  
                    <img src={logo} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
                    <h2 style={{ margin: 0 }}>Student Portal</h2>
                </div>
                <nav>
                    <button title="Go to Home Page">
                        <FaHome className="icon"/>Home</button>
                    <button style={{ opacity: 0.5 }} title="Viev Profile">
                        <FaUser className="icon"/>Profile</button>
                    <button style={{ opacity: 0.5 }} title="Viev your class schedules">
                        <FaCalendarAlt className="icon"/>My Schedule</button>
                    <button >
                        <FaSignOutAlt className="icon"/>Logout
                    </button>
                </nav>
            </div>
            <div className="main-content">
                
                <div className="background-overlay"></div>
                
                
                
                    <header className="header">
                        <div className="welcome-msg">
                            <h1>Welcome back</h1>
                        </div>
                    </header>

                    {isRegistrationOpen ?(<div className="schedule-table">
                        <h2>Yoyr weekly Schedule</h2>
                    </div>

                    ):
                    (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow:1, paddingBottom:'50px' }}>
                            <div className="schedule-card">
                                <span className="status-icon">⏳</span>
                                <h3>Schedules Not Published</h3>
                                <p>
                                    The registration period is currently closed. <br />
                                    Please check back later when the administration publishes the finalized timetables.
                                </p>
                                <div className="status-badge" >
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