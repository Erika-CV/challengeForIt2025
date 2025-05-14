const { v4: uuidv4 } = require('uuid');

// Simulación de base de datos en memoria
let tasks = [];

const getTasks = (req, res) => {
  res.json(tasks);
};

const createTask = (req, res) => {
  const { title, descripcion } = req.body;
  const newTask = {
    id: uuidv4(),
    title,
    descripcion,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, descripcion, completed } = req.body;

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  task.title = title !== undefined ? title : task.title;
  task.descripcion = descripcion !== undefined ? descripcion : task.descripcion;
  task.completed = completed !== undefined ? completed : task.completed;

  res.json(task);
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).end();
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
