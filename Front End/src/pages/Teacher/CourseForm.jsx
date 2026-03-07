import React from 'react';
import '../../Styles/teacher/CourseForm.css';

const CourseForm = ({ 
  course, setCourse, 
  day, setDay, 
  startTime, setStartTime, 
  endTime, setEndTime, 
  addCourse, 
  availableCourses = [] 
}) => {
  return (
    <div className="form-container">
      <h3 className="form-title">Add New Class</h3>
      <div className="form-inputs-row">
        <select 
          className="select-field select-course" 
          value={course} 
          onChange={(e) => setCourse(e.target.value)}
          style={{ flex: 2, minWidth: "200px" }}
        >
          <option value="">Select Course</option>
          {availableCourses && availableCourses.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>
        <select className="select-field select-day" value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">Select Day</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
        </select>
        <div className="time-box">
          <span className="time-label">From:</span>
          <input className="input-field" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div className="time-box">
          <span className="time-label">To:</span>
          <input className="input-field" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <button className="btn-add" onClick={addCourse}>Add Class</button>
      </div>
    </div>
  );
};

export default CourseForm;