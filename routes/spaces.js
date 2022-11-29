const express = require("express");
const router = express.Router();
const spacesController = require("../controllers/spaces")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// get spaces

router.get("/", ensureAuth, spacesController.getSpacesList);
router.get("/:room", spacesController.getSpaces);



module.exports = router; 