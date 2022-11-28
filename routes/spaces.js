const express = require("express");
const router = express.Router();
const spacesController = require("../controllers/spaces")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// get spaces

router.get("/getSpaces", ensureAuth, spacesController.getSpaces);



module.exports = router; 