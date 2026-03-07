import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "../../Styles/Teacher/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { name: "My Schedule" },
    { name: "Profile" },
    { name: "Courses"  },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  
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
        <li className="menu-item" onClick={handleLogout} style={{ marginTop: "20px", color: "#ff8888" }}>
          <span className="item-icon"><FaSignOutAlt /></span>
          <span className="item-text">Logout</span>
        </li>
      </ul>
      <div className="sidebar-footer">© 2026 Admin Panel</div>
    </div>
  );
};

export default Sidebar;