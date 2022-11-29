const express = require("express");
const router = express.Router();
const convertController = require("../controllers/convert");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// get spaces

router.get("/getConvert", ensureAuth, convertController.getConvert);
router.get("/storedTexts", ensureAuth, convertController.getStoredTexts);
router.post("/postText", ensureAuth, convertController.postText);
router.post("/getTranslate", ensureAuth, convertController.getTranslate);
router.post("/postToDB", ensureAuth, convertController.postToDB);




module.exports = router;