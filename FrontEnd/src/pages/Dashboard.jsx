import { useState, useEffect } from "react";
import { Users, UserCheck, Building2, GraduationCap, BookOpen, X } from "lucide-react";

const readLS = (key) => {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
};

function timeAgo(ts) {
    if (!ts) return "Just now";
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}


function StatCard({ icon, label, value, subtitle }) {
    return (
        <div style={{
            background: "white", borderRadius: "12px", border: "1px solid #eee",
            padding: "24px", flex: 1, minWidth: 0
        }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#f0f7f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {icon}
            </div>
            <div style={{ marginTop: "16px", fontSize: "13px", color: "#888" }}>{label}</div>
            <div style={{ fontSize: "28px", fontWeight: "800", margin: "4px 0", color: "#1a1a1a" }}>{value}</div>
            <div style={{ fontSize: "12px", color: "#aaa" }}>{subtitle}</div>
        </div>
    );
}

function ViewAllModal({ allActivity, onClose }) {
    return (
        <div style={{
            position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
            <div style={{
                background: "white", borderRadius: "16px", padding: "28px",
                width: "520px", maxHeight: "80vh", display: "flex", flexDirection: "column",
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>All Activity</h2>
                    <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                        <X size={20} color="#888" />
                    </button>
                </div>

                <div style={{ overflowY: "auto", flex: 1 }}>
                    {allActivity.length === 0 ? (
                        <div style={{ textAlign: "center", color: "#bbb", fontSize: "14px", padding: "40px 0" }}>
                            No activity yet.
                        </div>
                    ) : allActivity.map((a, i) => (
                        <div key={i} style={{
                            display: "flex", alignItems: "center", gap: "14px",
                            padding: "12px 0",
                            borderBottom: i < allActivity.length - 1 ? "1px solid #f5f5f5" : "none"
                        }}>
                            <div style={{
                                width: "36px", height: "36px", borderRadius: "50%",
                                backgroundColor: "#f0f7f0", display: "flex", alignItems: "center",
                                justifyContent: "center", flexShrink: 0
                            }}>
                                <GraduationCap size={16} color="#2d6a2d" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: "600", fontSize: "14px" }}>{a.label}</div>
                                <div style={{ fontSize: "12px", color: "#888" }}>{a.sub}</div>
                            </div>
                            <div style={{ fontSize: "12px", color: "#bbb", whiteSpace: "nowrap" }}>{timeAgo(a.ts)}</div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: "20px", textAlign: "right" }}>
                    <button onClick={onClose} style={{
                        padding: "10px 24px", borderRadius: "8px", border: "1px solid #ddd",
                        background: "white", cursor: "pointer", fontSize: "14px"
                    }}>Close</button>
                </div>
            </div>
        </div>
    );
}


export default function Dashboard() {
    const [counts, setCounts] = useState({ students: 0, instructors: 0, rooms: 0, courses: 0 });
    const [recentActivity, setRecentActivity] = useState([]);
    const [allActivity, setAllActivity] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const refresh = () => {
        const students    = readLS("students");
        const instructors = readLS("instructors");
        const rooms       = readLS("rooms");
        const courses     = readLS("courses");

        setCounts({
            students:    students.length,
            instructors: instructors.length,
            rooms:       rooms.length,
            courses:     courses.length,
        });

        const events = [
            ...students.map(s    => ({ label: "Student added",    sub: s.name,                  ts: s.createdAt })),
            ...instructors.map(i => ({ label: "Instructor added", sub: i.name,                  ts: i.createdAt })),
            ...rooms.map(r       => ({ label: "Room added",       sub: r.name,                  ts: r.createdAt })),
            ...courses.map(c     => ({ label: "Course added",     sub: `${c.code} – ${c.name}`, ts: c.createdAt })),
        ].sort((a, b) => b.ts - a.ts);

        setAllActivity(events);
        setRecentActivity(events.slice(0, 4));
    };

    useEffect(() => {
        refresh();
        window.addEventListener("storage", refresh);
        const timer = setInterval(refresh, 2000);
        return () => { window.removeEventListener("storage", refresh); clearInterval(timer); };
    }, []);

    const stats = [
        { icon: <Users size={20} color="#2d6a2d" />,     label: "Total Students",    value: counts.students.toLocaleString(),    subtitle: "Enrolled this semester" },
        { icon: <UserCheck size={20} color="#2d6a2d" />, label: "Total Instructors", value: counts.instructors.toLocaleString(), subtitle: "Currently teaching" },
        { icon: <Building2 size={20} color="#2d6a2d" />, label: "Total Rooms",       value: counts.rooms.toLocaleString(),       subtitle: "Ready for scheduling" },
        { icon: <BookOpen size={20} color="#2d6a2d" />,  label: "Total Courses",     value: counts.courses.toLocaleString(),     subtitle: "Active this semester" },
    ];

    return (
        <div style={{ padding: "0 32px 32px", background: "#f5f7f5", minHeight: "100vh", fontFamily: "sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0 20px" }}>
                <div>
                    <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>UniSchedule / <strong>Dashboard</strong></div>
                    <h1 style={{ fontSize: "24px", fontWeight: "700", margin: 0 }}>Dashboard</h1>
                </div>
                <span style={{ background: "#f0f7f0", color: "#2d6a2d", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>● System Online</span>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "24px" }}>
                {stats.map(s => <StatCard key={s.label} {...s} />)}
            </div>

            {/* Recent Activity */}
            <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eee", padding: "24px", maxWidth: "620px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700" }}>Recent Activity</h3>
                    <span
                        onClick={() => setShowAll(true)}
                        style={{ fontSize: "13px", color: "#888", cursor: "pointer", userSelect: "none" }}
                    >
                        View all ↗
                    </span>
                </div>

                {recentActivity.length === 0 ? (
                    <div style={{ textAlign: "center", color: "#bbb", fontSize: "14px", padding: "24px 0" }}>
                        No activity yet. Start by adding students, instructors, rooms, or courses.
                    </div>
                ) : recentActivity.map((a, i) => (
                    <div key={i} style={{
                        display: "flex", alignItems: "center", gap: "14px",
                        padding: "12px 0",
                        borderBottom: i < recentActivity.length - 1 ? "1px solid #f5f5f5" : "none"
                    }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#f0f7f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <GraduationCap size={16} color="#2d6a2d" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: "600", fontSize: "14px" }}>{a.label}</div>
                            <div style={{ fontSize: "12px", color: "#888" }}>{a.sub}</div>
                        </div>
                        <div style={{ fontSize: "12px", color: "#bbb", whiteSpace: "nowrap" }}>{timeAgo(a.ts)}</div>
                    </div>
                ))}
            </div>

            {showAll && (
                <ViewAllModal allActivity={allActivity} onClose={() => setShowAll(false)} />
            )}
        </div>
    );
}