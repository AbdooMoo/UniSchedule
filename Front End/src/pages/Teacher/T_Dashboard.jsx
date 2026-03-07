import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import CourseForm from './CourseForm';
import ScheduleTable from './ScheduleTable';

const T_Dashboard = () => {
  const [course, setCourse] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setTeacherName(user.name);
      setTeacherId(user._id || user.id);  
      
      fetch(`http://localhost:5001/api/teachers/${user._id || user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.schedule) {
            const formatted = data.schedule.map(s => ({
              id: s._id,
              course: s.course,
              day: s.day,
              time: `${s.startTime} - ${s.endTime}`
            }));
            setSchedule(formatted);
          }
        })
        .catch(err => console.error("Error loading teacher:", err));

      fetch("http://localhost:5001/api/courses")
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setAvailableCourses(data); })
        .catch(err => console.error("Error loading courses:", err));
    }
  }, []);

  const addCourse = async () => {
     if (!course || !day || !startTime || !endTime) {
      alert("Please fill all fields: " + (!course ? "Course " : "") + (!day ? "Day " : "") + (!startTime ? "Start " : "") + (!endTime ? "End" : ""));
      return;
    }

     if (!teacherId) {
      alert("Teacher ID missing. Please re-login.");
      return;
    }

    const currentScheduleRaw = schedule.map(s => {
      const times = s.time.split(" - ");
      return { course: s.course, day: s.day, startTime: times[0], endTime: times[1] };
    });

    const newClass = { course, day, startTime, endTime };
    const updatedScheduleRaw = [...currentScheduleRaw, newClass];

    try {
      const res = await fetch(`http://localhost:5001/api/teachers/${teacherId}/schedule`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedule: updatedScheduleRaw })
      });

      const data = await res.json();

      if (res.ok) {
        const formatted = data.schedule.map(s => ({
          id: s._id,
          course: s.course,
          day: s.day,
          time: `${s.startTime} - ${s.endTime}`
        }));
        setSchedule(formatted);
        setCourse(""); setDay(""); setStartTime(""); setEndTime("");
        alert("Class added successfully!");  
      } else {
         alert("Server Error: " + (data.message || "Failed to save schedule"));
      }
    } catch (error) {
      alert("Connection Error: Check if your Backend is running.");
    }
  };

  const deleteCourse = async (id) => {
    const updatedScheduleLocal = schedule.filter(item => item.id !== id);
    const updatedScheduleRaw = updatedScheduleLocal.map(s => {
      const times = s.time.split(" - ");
      return { course: s.course, day: s.day, startTime: times[0], endTime: times[1] };
    });

    try {
      const res = await fetch(`http://localhost:5001/api/teachers/${teacherId}/schedule`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedule: updatedScheduleRaw })
      });
      if (res.ok) setSchedule(updatedScheduleLocal);
    } catch (error) {
      alert("Error deleting course");
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '24px', color: '#2d3748' }}>Welcome, Dr. {teacherName}</h1>
          <p style={{ color: '#718096' }}>Manage your lecture schedule and courses.</p>
        </header>
        <CourseForm 
          course={course} setCourse={setCourse}
          day={day} setDay={setDay}
          startTime={startTime} setStartTime={setStartTime}
          endTime={endTime} setEndTime={setEndTime}
          addCourse={addCourse}
          availableCourses={availableCourses}
        />
        <ScheduleTable schedule={schedule} deleteCourse={deleteCourse} />
      </div>
    </div>
  );
};

export default T_Dashboard;