const express = require("express");
const router = express.Router();

const {createTask,getAllTasks,getMyTasks} = require("../controllers/taskController");
const { authMiddleware } = require("../middleware/auth");



router.post("/create", authMiddleware, createTask);
router.get("/allTasks", authMiddleware, getAllTasks);
router.get("/myTask", authMiddleware, getMyTasks);


module.exports = router;