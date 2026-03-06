import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, Plus, X, Edit2, Trash2 } from "lucide-react";

const roles = [ "Admin"];
const statuses = ["Active", "Inactive"];

const statusStyle = (status) => ({
    Active: { backgroundColor: "#f0f7f0", color: "#2d6a2d" },
    Inactive: { backgroundColor: "#f5f5f5", color: "#888" },
}[status] || {});

const roleStyle = (role) => ({
    
    "Admin":       { backgroundColor: "#eff6ff", color: "#d81d1d" },
    
}[role] || {});

const initials = (name) => name.split(" ").map(n => n[0]).join("").toUpperCase();

export default function Admins() {
    const [admins, setAdmins] = useState(() => {
        const saved = localStorage.getItem("admins");
        return saved ? JSON.parse(saved) : [
            { id: 1, adminId: "ADM-2024-001", name: "Admin User", email: "admin@unischedule.edu", role: "Super Admin", status: "Active", createdAt: Date.now() }
        ];
    });

    useEffect(() => {
        localStorage.setItem("admins", JSON.stringify(admins));
    }, [admins]);

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editAdmin, setEditAdmin] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", role: "Admin", status: "Active" });

    const filtered = admins.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase())
    );

    const openAdd = () => {
        setEditAdmin(null);
        setForm({ name: "", email: "", role: "Admin", status: "Active" });
        setShowModal(true);
    };

    const openEdit = (admin) => {
        setEditAdmin(admin);
        setForm({ name: admin.name, email: admin.email, role: admin.role, status: admin.status });
        setShowModal(true);
        setOpenMenu(null);
    };

    const handleSave = () => {
        if (!form.name || !form.email) return;
        if (editAdmin) {
            setAdmins(admins.map(a => a.id === editAdmin.id ? { ...a, ...form } : a));
        } else {
            const newId = Date.now();
            const newAdminId = `ADM-2024-00${admins.length + 1}`;
            setAdmins([...admins, { id: newId, adminId: newAdminId, createdAt: Date.now(), ...form }]);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        setAdmins(admins.filter(a => a.id !== id));
        setOpenMenu(null);
    };

    return (
        <div style={{ padding: "0 32px 32px", background: "#f5f7f5", minHeight: "100vh", fontFamily: "sans-serif" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "24px 0 20px" }}>
                <div>
                    <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>UniSchedule / Admins</div>
                    <h1 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 4px" }}>Admin Management</h1>
                    <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>Manage admin accounts and permissions</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ background: "#f0f7f0", color: "#2d6a2d", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>● System Online</span>
                    <button onClick={openAdd} style={{
                        display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#1a5e4d",
                        color: "white", border: "none", borderRadius: "8px", padding: "10px 18px",
                        fontSize: "14px", fontWeight: "600", cursor: "pointer"
                    }}>
                        <Plus size={16} /> Add Admin
                    </button>
                </div>
            </div>

            {/* Table Card */}
            <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eee" }}>
                {/* Search */}
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

                {/* Table Header */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 0.8fr 0.8fr 0.5fr", padding: "10px 20px", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
                    {["USER", "ADMIN ID", "ROLE", "STATUS", "CREATED", "ACTIONS"].map(h => (
                        <span key={h} style={{ fontSize: "11px", fontWeight: "700", color: "#aaa", letterSpacing: "0.5px" }}>{h}</span>
                    ))}
                </div>

                {/* Rows */}
                {filtered.length === 0 ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#aaa", fontSize: "14px" }}>
                        No admins found
                    </div>
                ) : filtered.map(admin => (
                    <div key={admin.id} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 0.8fr 0.8fr 0.5fr", padding: "16px 20px", borderBottom: "1px solid #f5f5f5", alignItems: "center", position: "relative" }}>
                        {/* User */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#fef3f2", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "13px", color: "#c0392b", flexShrink: 0 }}>
                                {initials(admin.name)}
                            </div>
                            <div>
                                <div style={{ fontWeight: "600", fontSize: "14px" }}>{admin.name}</div>
                                <div style={{ fontSize: "12px", color: "#888" }}>{admin.email}</div>
                            </div>
                        </div>

                        {/* Admin ID */}
                        <span style={{ fontSize: "14px", color: "#555" }}>{admin.adminId}</span>

                        {/* Role Badge */}
                        <span style={{ ...roleStyle(admin.role), padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", display: "inline-block", width: "fit-content" }}>
                            {admin.role}
                        </span>

                        {/* Status Badge */}
                        <span style={{ ...statusStyle(admin.status), padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", display: "inline-block", width: "fit-content" }}>
                            {admin.status}
                        </span>

                        {/* Created Date */}
                        <span style={{ fontSize: "13px", color: "#888" }}>
                            {new Date(admin.createdAt).toLocaleDateString("en-GB")}
                        </span>

                        {/* Actions Menu */}
                        <div style={{ position: "relative" }}>
                            <button onClick={() => setOpenMenu(openMenu === admin.id ? null : admin.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                                <MoreHorizontal size={18} color="#888" />
                            </button>
                            {openMenu === admin.id && (
                                <div style={{ position: "absolute", right: 0, top: "100%", background: "white", border: "1px solid #eee", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 100, minWidth: "140px" }}>
                                    <div onClick={() => openEdit(admin)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", cursor: "pointer", fontSize: "13px", color: "#333" }}>
                                        <Edit2 size={14} /> Edit
                                    </div>
                                    <div onClick={() => handleDelete(admin.id)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", cursor: "pointer", fontSize: "13px", color: "#e53e3e" }}>
                                        <Trash2 size={14} /> Delete
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Footer */}
                <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", color: "#888" }}>Showing {filtered.length} of {admins.length} admins</span>
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
                            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>{editAdmin ? "Edit Admin" : "Add New Admin"}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
                        </div>

                        {/* Text Inputs */}
                        {[
                            { label: "Full Name", key: "name", type: "text", placeholder: "e.g. Sara Ahmed" },
                            { label: "Email", key: "email", type: "email", placeholder: "e.g. sara@unischedule.edu" },
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

                        {/* Select Inputs */}
                        {[
                            { label: "Role", key: "role", options: roles },
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

                        {/* Buttons */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                            <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "11px", borderRadius: "8px", border: "1px solid #ddd", background: "white", cursor: "pointer", fontSize: "14px" }}>Cancel</button>
                            <button onClick={handleSave} style={{ flex: 1, padding: "11px", borderRadius: "8px", border: "none", background: "#1a5e4d", color: "white", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
                                {editAdmin ? "Save Changes" : "Add Admin"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}