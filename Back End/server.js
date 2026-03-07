const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

 app.use(cors());
app.use(express.json());

 const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students'); 
const courseRoutes = require('./routes/courses');
const teacherRoutes = require('./routes/teachers');
const roomRoutes = require('./routes/rooms');
const dashboardRoutes = require('./routes/dashboard');

 app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/teachers', teacherRoutes);  
app.use('/api/rooms', roomRoutes);
app.use('/api/dashboard', dashboardRoutes);

 app.get('/api/health', (req, res) => res.json({ status: "ok" }));

 const PORT = process.env.PORT || 5001; 
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/unischedule';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err.message));