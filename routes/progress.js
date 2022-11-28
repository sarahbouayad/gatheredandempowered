const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progress");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.get("/:id", progressController.getTask);

router.get("/progress", progressController.getProgress);

router.post("/createTask", progressController.createTask);

router.put("/completeTasks/:id", progressController.completeTasks);

router.delete("/deleteTask/:id", progressController.deleteTask); 

module.exports = router;  