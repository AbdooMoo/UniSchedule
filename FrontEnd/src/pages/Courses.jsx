import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, Plus, X, Edit2, Trash2 } from "lucide-react";

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const MINUTES = ["00", "15", "30", "45"];

const statusStyle = (status) => ({
  Active: { backgroundColor: "#f0f7f0", color: "#2d6a2d" },
  Inactive: { backgroundColor: "#f5f5f5", color: "#888" },
  Full: { backgroundColor: "#fff0f0", color: "#c0392b" },
}[status] || {});

const formatTime = (t) => `${t.hour}:${t.minute} ${t.period}`;
const formatDays = (days) => days.join(", ");

const defaultTime = () => ({ hour: "09", minute: "00", period: "AM" });

export default function Courses() {
  const [courses, setCourses] = useState(() => {
    try { return JSON.parse(localStorage.getItem("courses")) || []; } catch { return []; }
  });
  const [instructors, setInstructors] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [form, setForm] = useState({
    code: "", name: "", instructor: "",
    selectedDays: [],
    timeFrom: defaultTime(),
    timeTo: { hour: "10", minute: "00", period: "AM" },
    enrolled: "0", capacity: "", status: "Active"
  });

  useEffect(() => {
    const loadInstructors = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("instructors")) || [];
        setInstructors(saved);
      } catch { setInstructors([]); }
    };
    loadInstructors();
    window.addEventListener("storage", loadInstructors);
    return () => window.removeEventListener("storage", loadInstructors);
  }, []);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const filtered = courses.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditCourse(null);
    setForm({ code: "", name: "", instructor: "", selectedDays: [], timeFrom: defaultTime(), timeTo: { hour: "10", minute: "00", period: "AM" }, enrolled: "0", capacity: "", status: "Active" });
    setShowModal(true);
  };

  const openEdit = (course) => {
    setEditCourse(course);
    setForm({
      code: course.code, name: course.name, instructor: course.instructor,
      selectedDays: course.selectedDays || [],
      timeFrom: course.timeFrom || defaultTime(),
      timeTo: course.timeTo || { hour: "10", minute: "00", period: "AM" },
      enrolled: course.enrolled, capacity: course.capacity, status: course.status
    });
    setShowModal(true);
    setOpenMenu(null);
  };

  const handleSave = () => {
    if (!form.name || !form.code) return;
    const courseData = {
      ...form,
      days: form.selectedDays.length > 0 ? formatDays(form.selectedDays) : "—",
      time: `${formatTime(form.timeFrom)} – ${formatTime(form.timeTo)}`,
    };
    if (editCourse) {
      setCourses(courses.map(c => c.id === editCourse.id ? { ...c, ...courseData } : c));
    } else {
      setCourses([...courses, { id: Date.now(), ...courseData }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id));
    setOpenMenu(null);
  };

  const toggleDay = (day) => {
    setForm(f => ({
      ...f,
      selectedDays: f.selectedDays.includes(day)
        ? f.selectedDays.filter(d => d !== day)
        : [...f.selectedDays, day]
    }));
  };

  const progressPercent = (enrolled, capacity) => {
    if (!capacity || capacity == 0) return 0;
    return Math.min((parseInt(enrolled) / parseInt(capacity)) * 100, 100);
  };

  const setTimeField = (which, key, val) => {
    setForm(f => ({ ...f, [which]: { ...f[which], [key]: val } }));
  };

  return (
    <div style={{ padding: "0 32px 32px", background: "#f5f7f5", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "24px 0 20px" }}>
        <div>
          <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>UniSchedule / Courses</div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 4px" }}>Course Management</h1>
          <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>Manage academic courses and class schedules</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ background: "#f0f7f0", color: "#2d6a2d", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>● System Online</span>
          <button onClick={openAdd} style={{
            display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#1a2e1a",
            color: "white", border: "none", borderRadius: "8px", padding: "10px 18px",
            fontSize: "14px", fontWeight: "600", cursor: "pointer"
          }}>
            <Plus size={16} /> Add Course
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eee", padding: "20px", marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ position: "relative", width: "340px" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..."
            style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "24px", border: "1px solid #e0e0e0", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", border: "1px solid #ddd", background: "white", cursor: "pointer", fontSize: "13px" }}>
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eee", padding: "60px", textAlign: "center", color: "#aaa", fontSize: "14px" }}>
          No courses yet. Click "Add Course" to get started.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {filtered.map(course => (
            <div key={course.id} style={{ background: "white", borderRadius: "12px", border: "1px solid #eee", padding: "20px", position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ backgroundColor: "#e8f5e8", color: "#2d6a2d", fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "6px" }}>{course.code}</span>
                <div style={{ position: "relative" }}>
                  <button onClick={() => setOpenMenu(openMenu === course.id ? null : course.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                    <MoreHorizontal size={18} color="#888" />
                  </button>
                  {openMenu === course.id && (
                    <div style={{ position: "absolute", right: 0, top: "100%", background: "white", border: "1px solid #eee", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 100, minWidth: "140px" }}>
                      <div onClick={() => openEdit(course)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", cursor: "pointer", fontSize: "13px", color: "#333" }}>
                        <Edit2 size={14} /> Edit
                      </div>
                      <div onClick={() => handleDelete(course.id)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", cursor: "pointer", fontSize: "13px", color: "#e53e3e" }}>
                        <Trash2 size={14} /> Delete
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "4px" }}>{course.name}</div>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>{course.instructor}</div>
              <div style={{ fontSize: "13px", color: "#555", marginBottom: "4px" }}>🗓 {course.days}</div>
              <div style={{ fontSize: "13px", color: "#555", marginBottom: "8px" }}>🕐 {course.time}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "#555" }}>👥 {course.enrolled}/{course.capacity}</span>
                <span style={{ ...statusStyle(course.status), padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>{course.status}</span>
              </div>
              <div style={{ height: "6px", backgroundColor: "#f0f0f0", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progressPercent(course.enrolled, course.capacity)}%`, backgroundColor: "#1a2e1a", borderRadius: "3px" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", width: "480px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>{editCourse ? "Edit Course" : "Add New Course"}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
            </div>

            {/* Course Code */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Course Code</label>
              <input placeholder="e.g. CS101" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} style={inputStyle} />
            </div>

            {/* Course Name */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Course Name</label>
              <input placeholder="e.g. Introduction to Programming" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
            </div>

            {/* Instructor Dropdown */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Instructor</label>
              {instructors.length > 0 ? (
                <select value={form.instructor} onChange={e => setForm({ ...form, instructor: e.target.value })} style={inputStyle}>
                  <option value="">— Select Instructor —</option>
                  {instructors.map(inst => (
                    <option key={inst.id} value={inst.name}>{inst.name}{inst.department ? ` · ${inst.department}` : ""}</option>
                  ))}
                </select>
              ) : (
                <input
                  placeholder="No instructors saved yet – type name manually"
                  value={form.instructor}
                  onChange={e => setForm({ ...form, instructor: e.target.value })}
                  style={{ ...inputStyle, borderColor: "#f0c040", backgroundColor: "#fffdf0" }}
                />
              )}
              {instructors.length === 0 && (
                <p style={{ fontSize: "11px", color: "#b08000", margin: "4px 0 0" }}>
                  💡 Add instructors in the Instructors page to select them here.
                </p>
              )}
            </div>

            {/* Days Multi-select */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Days</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                {ALL_DAYS.map(day => {
                  const selected = form.selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      style={{
                        padding: "7px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer",
                        border: selected ? "2px solid #1a2e1a" : "2px solid #e0e0e0",
                        background: selected ? "#1a2e1a" : "white",
                        color: selected ? "white" : "#555",
                        transition: "all 0.15s"
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time From / To */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Time</label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <TimePicker value={form.timeFrom} onChange={v => setForm(f => ({ ...f, timeFrom: v }))} label="From" />
                <span style={{ color: "#888", fontWeight: "600", fontSize: "13px" }}>→</span>
                <TimePicker value={form.timeTo} onChange={v => setForm(f => ({ ...f, timeTo: v }))} label="To" />
              </div>
            </div>

            {/* Enrolled & Capacity */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div>
                <label style={labelStyle}>Enrolled</label>
                <input type="number" placeholder="0" value={form.enrolled} onChange={e => setForm({ ...form, enrolled: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Capacity</label>
                <input type="number" placeholder="e.g. 50" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} style={inputStyle} />
              </div>
            </div>

            {/* Status */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Status</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {["Active", "Inactive", "Full"].map(s => (
                  <button key={s} onClick={() => setForm(f => ({ ...f, status: s }))} style={{
                    flex: 1, padding: "8px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer",
                    border: form.status === s ? "2px solid #1a2e1a" : "2px solid #e0e0e0",
                    background: form.status === s ? "#1a2e1a" : "white",
                    color: form.status === s ? "white" : "#555",
                    transition: "all 0.15s"
                  }}>{s}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "11px", borderRadius: "8px", border: "1px solid #ddd", background: "white", cursor: "pointer", fontSize: "14px" }}>Cancel</button>
              <button onClick={handleSave} style={{ flex: 1, padding: "11px", borderRadius: "8px", border: "none", background: "#1a2e1a", color: "white", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
                {editCourse ? "Save Changes" : "Add Course"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TimePicker({ value, onChange, label }) {
  const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const MINUTES = ["00", "15", "30", "45"];

  const set = (key, val) => onChange({ ...value, [key]: val });

  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: "11px", color: "#999", marginBottom: "4px", fontWeight: "600" }}>{label}</div>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <select value={value.hour} onChange={e => set("hour", e.target.value)} style={miniSelect}>
          {HOURS.map(h => <option key={h}>{h}</option>)}
        </select>
        <span style={{ color: "#888", fontWeight: "700" }}>:</span>
        <select value={value.minute} onChange={e => set("minute", e.target.value)} style={miniSelect}>
          {MINUTES.map(m => <option key={m}>{m}</option>)}
        </select>
        <select value={value.period} onChange={e => set("period", e.target.value)} style={{ ...miniSelect, fontWeight: "700", color: value.period === "AM" ? "#2d6a2d" : "#c0392b" }}>
          <option>AM</option>
          <option>PM</option>
        </select>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444" };
const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", outline: "none", boxSizing: "border-box", backgroundColor: "white" };
const miniSelect = { padding: "8px 6px", borderRadius: "7px", border: "1px solid #ddd", fontSize: "13px", outline: "none", backgroundColor: "white", cursor: "pointer" };