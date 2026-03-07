import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap, BookOpen, LogOut, ShieldCheck, DoorOpen } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin User");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.name) setAdminName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("/", { replace: true });
  };

  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/students", name: "Students", icon: Users },
    { path: "/admin/teachers", name: "Teachers", icon: GraduationCap },
    { path: "/admin/admins", name: "Admins", icon: ShieldCheck },
    { path: "/admin/courses", name: "Courses", icon: BookOpen },
    { path: "/admin/rooms", name: "Rooms", icon: DoorOpen },
  ];

  return (
    <aside style={{ width: "260px", backgroundColor: "#1a2e1a", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column", padding: "24px" }}>
      <div style={{ fontSize: "22px", fontWeight: "700", marginBottom: "32px", display: "flex", alignItems: "center", gap: "10px" }}>
        <GraduationCap size={28} />
        UniSchedule
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "8px",
              textDecoration: "none", marginBottom: "8px", fontSize: "14px", fontWeight: "500",
              color: location.pathname === item.path ? "white" : "#88b388",
              backgroundColor: location.pathname === item.path ? "#2d6a2d" : "transparent",
            }}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#2d6a2d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "600" }}>{adminName}</div>
            <div style={{ fontSize: "11px", color: "#88b388" }}>Administrator</div>
          </div>
        </div>
        <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "10px", background: "none", border: "none", color: "#ff8888", cursor: "pointer", fontSize: "13px", textAlign: "left" }}>
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );
}