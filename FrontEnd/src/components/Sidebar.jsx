import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, BookOpen, Building2,
  LogOut, GraduationCap,
  Settings, ChevronDown, UserCheck, Shield
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(true);

  const isActive = (path) => location.pathname === path;

  const navItem = (icon, label, path) => (
    <div
      key={label}
      onClick={() => navigate(path)}
      style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "10px 12px", borderRadius: "8px", cursor: "pointer",
        marginBottom: "4px",
        backgroundColor: isActive(path) ? "#145040" : "transparent",
        color: isActive(path) ? "white" : "#a8d5c2",
      }}
    >
      {icon}
      <span style={{ fontSize: "14px" }}>{label}</span>
    </div>
  );

  return (
    <div style={{
      width: "280px", minHeight: "100vh", backgroundColor: "#1a5e4d",  
      display: "flex", flexDirection: "column", color: "white", fontFamily: "sans-serif"
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px", borderBottom: "1px solid #1f6e5a" }}>  
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "50%",
            backgroundColor: "#145040", display: "flex", alignItems: "center", justifyContent: "center"  
          }}>
            <GraduationCap size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "16px" }}>UniSchedule</div>
            <div style={{ fontSize: "12px", color: "#a8d5c2" }}>Admin Panel</div> 
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {navItem(<LayoutDashboard size={18} />, "Dashboard", "/")}

        {/* User Management */}
        <div
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 12px", borderRadius: "8px", cursor: "pointer",
            marginBottom: "4px", color: "#a8d5c2"  
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Users size={18} />
            <span style={{ fontSize: "14px" }}>User Management</span>
          </div>
          <ChevronDown size={14} style={{ transform: userMenuOpen ? "rotate(180deg)" : "none" }} />
        </div>

        {userMenuOpen && (
          <div style={{ paddingLeft: "20px", marginBottom: "4px" }}>
            {navItem(<GraduationCap size={16} />, "Students", "/students")}
            {navItem(<UserCheck size={16} />, "Instructors", "/instructors")}
            {navItem(<Shield size={16} />, "Admins", "/admins")}  {/* ← جديد */}
          </div>
        )}

        {navItem(<BookOpen size={18} />, "Course Management", "/courses")}
        {navItem(<Building2 size={18} />, "Room Management", "/rooms")}
      </nav>

      {/* User */}
      <div style={{ padding: "16px", borderTop: "1px solid #1f6e5a" }}>  
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#145040",  
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700"
          }}>AD</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", fontWeight: "600" }}>Admin User</div>
            <div style={{ fontSize: "11px", color: "#a8d5c2" }}>admin@unischedule.edu</div> 
          </div>
          <Settings size={16} color="#a8d5c2" />  
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px",
          borderRadius: "8px", border: "1px solid #1f6e5a", cursor: "pointer",  
          color: "#a8d5c2", fontSize: "13px" 
        }}>
          <LogOut size={15} /> Sign Out
        </div>
      </div>
    </div>
  );
}