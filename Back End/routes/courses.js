const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await Course.find().populate('instructor', 'name').sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { code } = req.body;
    const existing = await Course.findOne({ code });
    if (existing) return res.status(400).json({ message: 'Course code already exists!' });

    const newCourse = new Course(req.body);
    await newCourse.save();
    const populated = await newCourse.populate('instructor', 'name');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('instructor', 'name');
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;