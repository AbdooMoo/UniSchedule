import bgImage from './assets/form.bg.2.png';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CourseForm from './components/CourseForm';
import ScheduleTable from './components/ScheduleTable';

function App() {
  const [schedule, setSchedule] = useState([]);
  const [course, setCourse] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const addCourse = () => {
    if (course && day && startTime && endTime) {
      const newEntry = { 
        id: Date.now(), 
        course, 
        day, 
        time: `${startTime} - ${endTime}` 
      };
      setSchedule([...schedule, newEntry]);
      setCourse(""); setDay(""); setStartTime(""); setEndTime("");
    } else {
      alert("Please fill all fields!");
    }
  };

  const deleteCourse = (id) => {
    setSchedule(schedule.filter(item => item.id !== id));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Sidebar />
      <div style={{ 
        flex: 1, padding: '100px', 
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${bgImage})`,
        backgroundSize: 'cover'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '30px', color: '#2d3748' }}>Schedule Management</h1>
          <CourseForm 
            course={course} setCourse={setCourse} day={day} setDay={setDay}
            startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime}
            addCourse={addCourse}
          />
          <ScheduleTable schedule={schedule} deleteCourse={deleteCourse} />
        </div>
      </div>
    </div>
  );
}

export default App;