import React from 'react';
import '../styles/Sidebar.css'; // استيراد الـ CSS من مكانه الجديد

const Sidebar = () => {
  const menuItems = [
    { name: 'My Schedule', icon: '📅' },
    { name: 'Profile', icon: '👤' },
    { name: 'Courses', icon: '📚' },
  ];

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Teacher Portal</h2>

      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <span className="item-icon">{item.icon}</span>
            <span className="item-text">{item.name}</span>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        © 2026 Admin Panel
      </div>
    </div>
  );
};

export default Sidebar;