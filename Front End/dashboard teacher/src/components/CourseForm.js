import React from 'react';
import '../styles/CourseForm.css'; // تم تعديل المسار هنا

const CourseForm = ({ course, setCourse, day, setDay, startTime, setStartTime, endTime, setEndTime, addCourse }) => {
  return (
    <div className="form-container">
      <h3 className="form-title">Add New Class</h3>
      <div className="form-inputs-row">
        <input 
          className="input-field input-course"
          placeholder="Course Name" 
          value={course} 
          onChange={(e) => setCourse(e.target.value)} 
        />
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