const pdfParse = require("pdf-parse");
const translate = require("@iamtraction/google-translate");
const Text = require("../models/Text");


module.exports = {
  // get profile, sending user, posts
  getConvert: async (req, res) => {
    console.log("navigated to convert");
    try {
      res.render("convert.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  // get post to save document
  postText: async (req, res) => {
    console.log("extracting Text");
    try {
      if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
      }
      pdfParse(req.files.pdfFile).then((result) => {
        console.log(result);
        res.send(result.text);
      });
    } catch (err) {
      console.log(err);
    }
  },
  // translate extracted Texts from pdf-parsing
  getTranslate: async (req, res) => {
    console.log("translating Text");
    console.log(req.body.translatedText);
    try {
      translate(req.body.translatedText, { to: req.body.lang }).then(function (
        text
      ) {
        res.send(text.text);
      });
    } catch (err) {
      console.log(err);
    }
  },
  // posting text to DB
  postToDB: async (req, res) => {
    console.log("Posting To DB");
    try {
      await Text.create({
        extractedText: req.body.extractedText,
      });
      console.log("text has been saved")
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
  // get posted Text from DB
  getStoredTexts: async (req, res) => {
    console.log("navigating to stored Texts");
    try {
      const texts = await Text.find().sort({ createdAt: "desc" }).lean();
     
      res.render("storedTexts.ejs", {
        texts: texts});
        console.log(texts)
    } catch (err) {
      console.log(err);
    }
  },
};
