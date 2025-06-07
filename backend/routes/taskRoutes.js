const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { validateTaskInput } = require('../middleware/validation');

const router = express.Router();

// Protect all routes
router.use(protect);

router
  .route('/')
  .get(getTasks)
  .post(validateTaskInput, createTask);

router
  .route('/:id')
  .get(getTask)
  .put(validateTaskInput, updateTask)
  .delete(deleteTask);

module.exports = router;