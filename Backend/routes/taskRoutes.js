const express = require("express");
const router = express.Router();

const {createTask,getAllTasks,getMyTasks, getDashboardData, updateTask, deleteTask , markTaskCompleted} = require("../controllers/taskController");
const { authMiddleware } = require("../middleware/auth");



router.post("/create", authMiddleware, createTask);
router.get("/allTasks", authMiddleware, getAllTasks);
router.get("/myTask", authMiddleware, getMyTasks);

router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

router.put("/complete/:taskId", authMiddleware, markTaskCompleted);

router.get("/dashboard", authMiddleware, getDashboardData);


module.exports = router;