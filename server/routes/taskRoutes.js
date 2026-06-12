const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");


// CREATE TASK
router.post("/", protect, createTask);


// GET TASKS
router.get("/", protect, getTasks);


// DELETE TASK
router.delete("/:id", protect, deleteTask);


// UPDATE TASK
router.put("/:id", protect, updateTask);

module.exports = router;