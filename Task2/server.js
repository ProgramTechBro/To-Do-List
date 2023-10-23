const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let tasks = [];

// Get all tasks
app.get('/tasks', (_req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  tasks.push(task);
  res.json({ message: 'Task added successfully' });
});

// Edit a task by ID
app.put('/tasks/:id', (req, res) => {
  console.log("Put function running");
  const { id } = req.params;
  const { updatedTask } = req.body;
  tasks[id] = updatedTask;
  res.json({ message: 'Task updated successfully' });
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks.splice(id, 1);
  res.json({ message: 'Task deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
