import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, Plus, X, Edit2, Trash2, BookOpen } from "lucide-react";

const departments = ["Computer Science", "Mathematics", "Physics", "Biology"];
const statuses = ["Active", "Inactive", "Pending"];

const statusStyle = (status) => ({
  Active: { backgroundColor: "#f0f7f0", color: "#2d6a2d" },
  Inactive: { backgroundColor: "#f5f5f5", color: "#888" },
  Pending: { backgroundColor: "#fff8e1", color: "#b8860b" },
}[status] || {});

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [form, setForm] = useState({ name: "", code: "", department: "Computer Science", instructor: "", status: "Active" });

  useEffect(() => {
    fetch("http://localhost:5001/api/courses").then(res => res.json()).then(data => setCourses(data));
    fetch("http://localhost:5001/api/teachers").then(res => res.json()).then(data => setTeachers(data));
  }, []);

  const filtered = courses.filter(c => 
    (c.name?.toLowerCase().includes(search.toLowerCase())) || 
    (c.code?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = async () => {
    if (!form.name || !form.code) {
      alert("Please fill name and code!");
      return;
    }

    const url = editCourse ? `http://localhost:5001/api/courses/${editCourse._id}` : "http://localhost:5001/api/courses";
    const res = await fetch(url, {
      method: editCourse ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      if (editCourse) setCourses(courses.map(c => c._id === editCourse._id ? data : c));
      else setCourses([data, ...courses]);
      setShowModal(false);
      setEditCourse(null);
      setForm({ name: "", code: "", department: "Computer Science", instructor: "", status: "Active" });
    } else {
      alert(data.message);
    }
  };

  const openEdit = (course) => {
    setEditCourse(course);
    setForm({ name: course.name, code: course.code, department: course.department, instructor: course.instructor?._id || "", status: course.status });
    setShowModal(true);
    setOpenMenu(null);
  };

  return (
    <div style={{ padding: "0 32px 32px", background: "#f5f7f5", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "24px 0 20px" }}>
        <div>
          <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>UniSchedule / Courses</div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 4px" }}>Course Management</h1>
          <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>Manage academic courses and assignments</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ background: "#f0f7f0", color: "#2d6a2d", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>● System Online</span>
          <button onClick={() => { setEditCourse(null); setForm({ name: "", code: "", department: "Computer Science", instructor: "", status: "Active" }); setShowModal(true); }} style={{ backgroundColor: "#1a2e1a", color: "white", border: "none", borderRadius: "8px", padding: "10px 18px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            <Plus size={16} /> Add Course
          </button>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eee" }}>
        <div style={{ padding: "20px", display: "flex", justifyContent: "space-between" }}>
          <div style={{ position: "relative", width: "340px" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
            <input placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "24px", border: "1px solid #e0e0e0", outline: "none" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", border: "1px solid #ddd", background: "white" }}>
            <Filter size={14} /> Filter
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 0.8fr 0.5fr", padding: "10px 20px", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
          {["COURSE NAME", "CODE", "INSTRUCTOR", "STATUS", "ACTIONS"].map(h => (
            <span key={h} style={{ fontSize: "11px", fontWeight: "700", color: "#aaa" }}>{h}</span>
          ))}
        </div>

        {filtered.map(c => (
          <div key={c._id} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 0.8fr 0.5fr", padding: "16px 20px", borderBottom: "1px solid #f5f5f5", alignItems: "center", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "8px", backgroundColor: "#e8f5e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BookOpen size={20} color="#2d6a2d" />
              </div>
              <div><div style={{ fontWeight: "600", fontSize: "14px" }}>{c.name}</div><div style={{ fontSize: "12px", color: "#888" }}>{c.department}</div></div>
            </div>
            <span style={{ fontSize: "14px" }}>{c.code}</span>
            <span style={{ fontSize: "14px" }}>{c.instructor?.name || "Unassigned"}</span>
            <span style={{ ...statusStyle(c.status), padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", width: "fit-content" }}>{c.status}</span>
            <div style={{ position: "relative" }}>
              <button onClick={() => setOpenMenu(openMenu === c._id ? null : c._id)} style={{ background: "none", border: "none", cursor: "pointer" }}><MoreHorizontal size={18} color="#888" /></button>
              {openMenu === c._id && (
                <div style={{ position: "absolute", right: 0, top: "100%", background: "white", border: "1px solid #eee", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 100, minWidth: "140px" }}>
                  <div onClick={() => openEdit(c)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", cursor: "pointer", fontSize: "13px" }}><Edit2 size={14} /> Edit</div>
                  <div onClick={async () => { if(window.confirm("Delete course?")) { await fetch(`http://localhost:5001/api/courses/${c._id}`, { method: "DELETE" }); setCourses(courses.filter(item => item._id !== c._id)); } }} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", cursor: "pointer", fontSize: "13px", color: "red" }}><Trash2 size={14} /> Delete</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", width: "440px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>{editCourse ? "Edit Course" : "Add New Course"}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Course Name</label>
              <input placeholder="e.g. Data Structures" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }} />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Course Code</label>
              <input placeholder="e.g. CS201" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }} />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Department</label>
              <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", background: "white" }}>
                {departments.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Assign Instructor</label>
              <select value={form.instructor} onChange={e => setForm({ ...form, instructor: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", background: "white" }}>
                <option value="">Select Instructor</option>
                {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", background: "white" }}>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "11px", borderRadius: "8px", border: "1px solid #ddd", background: "white" }}>Cancel</button>
              <button onClick={handleSave} style={{ flex: 1, padding: "11px", borderRadius: "8px", border: "none", background: "#1a2e1a", color: "white", fontWeight: "600" }}>{editCourse ? "Save Changes" : "Add Course"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}