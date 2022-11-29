const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const spacesController = require("../controllers/spaces");
const convertController = require("../controllers/convert");
const progressController = require("../controllers/progress");
const aboutController = require("../controllers/about");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now, including main pages: spaces, convert
// renders index.ejs
router.get("/", homeController.getIndex);

router.get("/index", homeController.getIndex);
// get profile page - located in posts controller
router.get("/profile", ensureAuth, postsController.getProfile);
// get spaces
router.get("/spaces", ensureAuth, spacesController.getSpaces);
// get convert page 
router.get("/convert", ensureAuth, convertController.getConvert);
// get progress page 
router.get("/progress", ensureAuth, progressController.getProgress);
// get about page 
router.get("/about", ensureAuth, aboutController.getAbout);
// get stored Texts page
router.get("/storedTexts", ensureAuth,convertController.getStoredTexts);
// get login page 
router.get("/login", authController.getLogin);
// post login page
router.post("/login", authController.postLogin);
// get logout page
router.get("/logout", authController.logout);
// get signup page
router.get("/signup", authController.getSignup);
// post signup page
router.post("/signup", authController.postSignup);

module.exports = router;
