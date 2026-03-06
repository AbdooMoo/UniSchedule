import React, { useState } from "react";
import "./Students.css";

const Students = ({ students, setStudents, setActivities, activities }) => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    dept: "Computer Science",
    status: "Active",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);

  const handleSave = () => {
    if (formData.name && formData.id && formData.email) {
      let actionTitle = "";
      let actionIcon = "";
      let actionColor = "";

      if (isEditing) {
        const updatedStudents = students.map((s) =>
          s.id === currentStudentId ? { ...formData } : s,
        );
        setStudents(updatedStudents);

        actionTitle = "Student updated";
        actionIcon = "fa-pen";
        actionColor = "edit-bg";
      } else {
        const currentDate = new Date().toISOString().split("T")[0];
        setStudents([{ ...formData, date: currentDate }, ...students]);

        actionTitle = "New student added";
        actionIcon = "fa-plus";
        actionColor = "add-bg";
      }

      const newAction = {
        id: Date.now(),
        title: actionTitle,
        name: formData.name,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        icon: actionIcon,
        color: actionColor,
      };
      setActivities([newAction, ...activities]);

      setShowModal(false);
      setIsEditing(false);
      setCurrentStudentId(null);
      setFormData({
        name: "",
        id: "",
        email: "",
        dept: "Computer Science",
        status: "Active",
      });
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      id: student.id,
      email: student.email,
      dept: student.dept,
      status: student.status,
    });
    setCurrentStudentId(student.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updatedList = students.filter((item) => item.id !== studentId);
      setStudents(updatedList);

      const deleteAction = {
        id: Date.now(),
        title: "Student removed",
        name: "ID: " + studentId,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        icon: "fa-trash",
        color: "delete-bg",
      };
      setActivities([deleteAction, ...activities]);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm);

    const matchesDept =
      selectedDept === "All" ||
      student.dept.toLowerCase() === selectedDept.toLowerCase();

    return matchesSearch && matchesDept;
  });

  return (
    <div className="students-page">
      <div className="page-header">
        <div className="header-text">
          <h2>Students Management</h2>
          <p className="header-caption">
            Manage, view, and update student records in your department.
          </p>
        </div>
        <button className="add-student-btn" onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-plus"></i> Add New Student
        </button>
      </div>

      <div className="table-controls">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="dept-filter"
          >
            <option value="All">All Departments</option>
            <option value="CS">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
            <option value="geology">Geology</option>
            <option value="astronomy">Astronomy</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Student ID</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>
                    <div className="student-info">
                      <div className="student-avatar">
                        {student.name.charAt(0)}
                      </div>
                      <span>{student.name}</span>
                    </div>
                  </td>

                  <td>{student.email}</td>

                  <td>{student.id}</td>

                  <td>
                    <span className="badge dept">{student.dept}</span>
                  </td>

                  <td>
                    <span
                      className={`status-tag ${student.status?.toLowerCase()}`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td>
                    <div className="action-btns">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(student)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(student.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#64748b",
                  }}
                >
                  No students found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{isEditing ? "Edit Student Details" : "Add New Student"}</h3>
            <button
              className="close-btn"
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
              }}
            >
              ×
            </button>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Student ID</label>
                <input
                  type="text"
                  placeholder="e.g. 2227349"
                  value={formData.id}
                  disabled={isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="example@univ.edu"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Department (Faculty of Science)</label>
              <select
                value={formData.dept}
                onChange={(e) =>
                  setFormData({ ...formData, dept: e.target.value })
                }
              >
                <option value="">Select Department</option>
                <option value="cs">Computer Science</option>
                <option value="math">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
                <option value="geology">Geology</option>
                <option value="astronomy">Astronomy</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>
                {isEditing ? "Update Changes" : "Save Student"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
