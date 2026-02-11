// Temporary in-memory array to store students
// Data will be lost when server restarts
let students = [];

// CREATE - Add a new student
exports.createStudent = (req, res) => {
  const student = req.body;   // Get data from request body
  students.push(student);     // Add student to array
  res.status(201).json(student);  // Send response
};

// READ ALL - Get all students
exports.getStudents = (req, res) => {
  res.json(students);
};

// READ ONE - Get student by index
exports.getStudent = (req, res) => {
  const index = req.params.id;  // Get index from URL
  res.json(students[index]);
};

// UPDATE - Update student by index
exports.updateStudent = (req, res) => {
  const index = req.params.id;
  students[index] = req.body;   // Replace existing data
  res.json(students[index]);
};

// DELETE - Remove student by index
exports.deleteStudent = (req, res) => {
  const index = req.params.id;
  students.splice(index, 1);    // Remove student from array
  res.json({ message: "Deleted successfully" });
};
