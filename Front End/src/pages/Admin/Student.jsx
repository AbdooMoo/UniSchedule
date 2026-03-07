import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, Plus, X, Edit2, Trash2 } from "lucide-react";

const departments = ["Computer Science", "Mathematics", "Physics", "Biology"];
const statuses = ["Active", "Inactive", "Pending"];

const statusStyle = (status) => ({
  Active: { backgroundColor: "#f0f7f0", color: "#2d6a2d" },
  Inactive: { backgroundColor: "#f5f5f5", color: "#888" },
  Pending: { backgroundColor: "#fff8e1", color: "#b8860b" },
}[status] || {});

const initials = (name) => name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", studentId: "", department: "Computer Science", status: "Active" });

  useEffect(() => {
    fetch("http://localhost:5001/api/students")
      .then(async res => {
          if(!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
          }
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
              throw new Error("Received non-JSON response from server");
          }
          return res.json();
      })
      .then(data => setStudents(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const filtered = students.filter(s =>
    (s.name && s.name.toLowerCase().includes(search.toLowerCase())) ||
    (s.email && s.email.toLowerCase().includes(search.toLowerCase()))
  );

  const openAdd = () => {
    setEditStudent(null);
    setForm({ name: "", email: "", studentId: "", department: "Computer Science", status: "Active" });
    setShowModal(true);
  };

  const openEdit = (student) => {
    setEditStudent(student);
    setForm({ name: student.name, email: student.email, studentId: student.studentId, department: student.department, status: student.status });
    setShowModal(true);
    setOpenMenu(null);
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.studentId) {
        alert("Please fill all required fields");
        return;
    }
    
    try {
      const url = editStudent 
        ? `http://localhost:5001/api/students/${editStudent._id}` 
        : "http://localhost:5001/api/students";
        
      const res = await fetch(url, {
        method: editStudent ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const contentType = res.headers.get("content-type");
      
      if (!res.ok) {
          if (contentType && contentType.includes("application/json")) {
              const errorData = await res.json();
              alert("Validation Error: " + (errorData.message || "Failed to save"));
          } else {
              const text = await res.text();
              throw new Error("Server Error: " + text.substring(0, 100));
          }
          return;
      }

      if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response");
      }

      const savedData = await res.json();
      
      if (editStudent) {
        setStudents(students.map(s => s._id === editStudent._id ? savedData : s));
      } else {
        setStudents([savedData, ...students]);
      }
      
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("System Connection Error: \n\n" + error.message);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/students/${id}`, { method: "DELETE" });
      if(res.ok) {
          setStudents(students.filter(s => s._id !== id));
      }
      setOpenMenu(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "0 32px 32px", background: "#f5f7f5", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "24px 0 20px" }}>
        <div>
          <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>UniSchedule / Students</div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 4px" }}>Student Management</h1>
          <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>Manage student records and information</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ background: "#f0f7f0", color: "#2d6a2d", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>● System Online</span>
          <button onClick={openAdd} style={{
            display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#1a2e1a",
            color: "white", border: "none", borderRadius: "8px", padding: "10px 18px",
            fontSize: "14px", fontWeight: "600", cursor: "pointer"
          }}>
            <Plus size={16} /> Add Student
          </button>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eee" }}>
        <div style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ position: "relative", width: "340px" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              style={{
                width: "100%", padding: "10px 12px 10px 36px", borderRadius: "24px",
                border: "1px solid #e0e0e0", fontSize: "14px", outline: "none", boxSizing: "border-box"
              }}
            />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", border: "1px solid #ddd", background: "white", cursor: "pointer", fontSize: "13px" }}>
            <Filter size={14} /> Filter
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 0.8fr 0.5fr", padding: "10px 20px", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
          {["USER", "STUDENT ID", "DEPARTMENT", "STATUS", "ACTIONS"].map(h => (
            <span key={h} style={{ fontSize: "11px", fontWeight: "700", color: "#aaa", letterSpacing: "0.5px" }}>{h}</span>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#aaa", fontSize: "14px" }}>
            No students found.
          </div>
        ) : filtered.map(student => (
          <div key={student._id} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 0.8fr 0.5fr", padding: "16px 20px", borderBottom: "1px solid #f5f5f5", alignItems: "center", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#e8f5e8", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "13px", color: "#2d6a2d", flexShrink: 0 }}>
                {initials(student.name)}
              </div>
              <div>
                <div style={{ fontWeight: "600", fontSize: "14px" }}>{student.name}</div>
                <div style={{ fontSize: "12px", color: "#888" }}>{student.email}</div>
              </div>
            </div>
            <span style={{ fontSize: "14px", color: "#555" }}>{student.studentId}</span>
            <span style={{ fontSize: "14px", color: "#555" }}>{student.department}</span>
            <span style={{ ...statusStyle(student.status), padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", display: "inline-block" }}>{student.status}</span>
            <div style={{ position: "relative" }}>
              <button onClick={() => setOpenMenu(openMenu === student._id ? null : student._id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                <MoreHorizontal size={18} color="#888" />
              </button>
              {openMenu === student._id && (
                <div style={{ position: "absolute", right: 0, top: "100%", background: "white", border: "1px solid #eee", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 100, minWidth: "140px" }}>
                  <div onClick={() => openEdit(student)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", cursor: "pointer", fontSize: "13px", color: "#333" }}>
                    <Edit2 size={14} /> Edit
                  </div>
                  <div onClick={() => handleDelete(student._id)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", cursor: "pointer", fontSize: "13px", color: "#e53e3e" }}>
                    <Trash2 size={14} /> Delete
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: "#888" }}>Showing {filtered.length} of {students.length} students</span>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Previous", "Next"].map(btn => (
              <button key={btn} style={{ padding: "7px 16px", borderRadius: "8px", border: "1px solid #ddd", background: "white", cursor: "pointer", fontSize: "13px" }}>{btn}</button>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", width: "440px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>{editStudent ? "Edit Student" : "Add New Student"}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
            </div>
            {[
              { label: "Full Name", key: "name", type: "text", placeholder: "e.g. John Smith" },
              { label: "Email", key: "email", type: "email", placeholder: "e.g. john@university.edu" },
              { label: "Student ID", key: "studentId", type: "text", placeholder: "e.g. 2227349" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444" }}>{f.label}</label>
                <input
                  type={f.type} placeholder={f.placeholder} value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
            {[
              { label: "Department", key: "department", options: departments },
              { label: "Status", key: "status", options: statuses },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444" }}>{f.label}</label>
                <select value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", outline: "none", backgroundColor: "white" }}>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "11px", borderRadius: "8px", border: "1px solid #ddd", background: "white", cursor: "pointer", fontSize: "14px" }}>Cancel</button>
              <button onClick={handleSave} style={{ flex: 1, padding: "11px", borderRadius: "8px", border: "none", background: "#1a2e1a", color: "white", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
                {editStudent ? "Save Changes" : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}