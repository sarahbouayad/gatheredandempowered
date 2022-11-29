const express = require("express");
const router = express.Router();
const convertController = require("../controllers/convert");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// get spaces

router.get("/getConvert", ensureAuth, convertController.getConvert);
router.post("/postText", ensureAuth, convertController.postText);
router.post("/getTranslate", ensureAuth, convertController.getTranslate)



module.exports = router;