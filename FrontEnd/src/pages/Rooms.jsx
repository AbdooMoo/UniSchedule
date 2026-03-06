import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, Plus, X, Edit2, Trash2 } from "lucide-react";

const roomTypes = ["Lecture", "Lab", "Seminar"];
const statuses = ["Available", "Unavailable", "Maintenance"];

const statusStyle = (status) => ({
  Available: { backgroundColor: "#f0f7f0", color: "#2d6a2d" },
  Unavailable: { backgroundColor: "#fff0f0", color: "#c0392b" },
  Maintenance: { backgroundColor: "#fff8e1", color: "#b8860b" },
}[status] || {});

const typeStyle = (type) => ({
  Lecture: { backgroundColor: "#f0f7f0", color: "#2d6a2d" },
  Lab: { backgroundColor: "#e8f4fd", color: "#2471a3" },
  Seminar: { backgroundColor: "#f5eef8", color: "#7d3c98" },
  Auditorium: { backgroundColor: "#fef9e7", color: "#b7950b" },
}[type] || {});

export default function Rooms() {
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem("rooms");
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [form, setForm] = useState({ name: "", location: "", type: "Lecture", capacity: "", status: "Available" });

  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  const filtered = rooms.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.location.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditRoom(null);
    setForm({ name: "", location: "", type: "Lecture", capacity: "", status: "Available" });
    setShowModal(true);
  };

  const openEdit = (room) => {
    setEditRoom(room);
    setForm({ name: room.name, location: room.location, type: room.type, capacity: room.capacity, status: room.status });
    setShowModal(true);
    setOpenMenu(null);
  };

  const handleSave = () => {
    if (!form.name || !form.location) return;
    if (editRoom) {
      setRooms(rooms.map(r => r.id === editRoom.id ? { ...r, ...form, updatedAt: Date.now() } : r));
    } else {
      setRooms([...rooms, { id: Date.now(), createdAt: Date.now(), ...form }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setRooms(rooms.filter(r => r.id !== id));
    setOpenMenu(null);
  };

  return (
    <div style={{ padding: "0 32px 32px", background: "#f5f7f5", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "24px 0 20px" }}>
        <div>
          <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>UniSchedule / Rooms</div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 4px" }}>Room Management</h1>
          <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>Manage campus classrooms and facilities</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ background: "#f0f7f0", color: "#2d6a2d", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>● System Online</span>
          <button onClick={openAdd} style={{
            display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#1a2e1a",
            color: "white", border: "none", borderRadius: "8px", padding: "10px 18px",
            fontSize: "14px", fontWeight: "600", cursor: "pointer"
          }}>
            <Plus size={16} /> Add Room
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eee" }}>
        <div style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ position: "relative", width: "340px" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rooms..."
              style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "24px", border: "1px solid #e0e0e0", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", border: "1px solid #ddd", background: "white", cursor: "pointer", fontSize: "13px" }}>
            <Filter size={14} /> Filter
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr 0.8fr 0.8fr 0.8fr 0.5fr", padding: "10px 20px", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
          {["ROOM", "LOCATION", "TYPE", "CAPACITY", "STATUS", "ACTIONS"].map(h => (
            <span key={h} style={{ fontSize: "11px", fontWeight: "700", color: "#aaa", letterSpacing: "0.5px" }}>{h}</span>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#aaa", fontSize: "14px" }}>
            No rooms yet. Click "Add Room" to get started.
          </div>
        ) : filtered.map(room => (
          <div key={room.id} style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr 0.8fr 0.8fr 0.8fr 0.5fr", padding: "16px 20px", borderBottom: "1px solid #f5f5f5", alignItems: "center" }}>
            <div style={{ fontWeight: "600", fontSize: "14px" }}>{room.name}</div>
            <span style={{ fontSize: "13px", color: "#666" }}>📍 {room.location}</span>
            <span style={{ ...typeStyle(room.type), padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", display: "inline-block" }}>{room.type}</span>
            <span style={{ fontSize: "14px", color: "#555" }}>👥 {room.capacity} seats</span>
            <span style={{ ...statusStyle(room.status), padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", display: "inline-block" }}>{room.status}</span>
            <div style={{ position: "relative" }}>
              <button onClick={() => setOpenMenu(openMenu === room.id ? null : room.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                <MoreHorizontal size={18} color="#888" />
              </button>
              {openMenu === room.id && (
                <div style={{ position: "absolute", right: 0, top: "100%", background: "white", border: "1px solid #eee", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 100, minWidth: "140px" }}>
                  <div onClick={() => openEdit(room)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", cursor: "pointer", fontSize: "13px", color: "#333" }}>
                    <Edit2 size={14} /> Edit
                  </div>
                  <div onClick={() => handleDelete(room.id)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", cursor: "pointer", fontSize: "13px", color: "#e53e3e" }}>
                    <Trash2 size={14} /> Delete
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: "#888" }}>Showing {filtered.length} of {rooms.length} rooms</span>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Previous", "Next"].map(btn => (
              <button key={btn} style={{ padding: "7px 16px", borderRadius: "8px", border: "1px solid #ddd", background: "white", cursor: "pointer", fontSize: "13px" }}>{btn}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", width: "440px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>{editRoom ? "Edit Room" : "Add New Room"}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
            </div>
            {[
              { label: "Room Name", key: "name", type: "text", placeholder: "e.g. Room 101" },
              { label: "Location", key: "location", type: "text", placeholder: "e.g. Science Hall, Floor 1" },
              { label: "Capacity (seats)", key: "capacity", type: "number", placeholder: "e.g. 50" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            {[
              { label: "Type", key: "type", options: roomTypes },
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
                {editRoom ? "Save Changes" : "Add Room"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}