const express = require('express');
const router = express.Router();     // Create router object
const controller = require('./controller');

// Route to create student
router.post('/', controller.createStudent);

// Route to get all students
router.get('/', controller.getStudents);

// Route to get one student by index
router.get('/:id', controller.getStudent);

// Route to update student by index
router.put('/:id', controller.updateStudent);

// Route to delete student by index
router.delete('/:id', controller.deleteStudent);

module.exports = router;   // Export router
