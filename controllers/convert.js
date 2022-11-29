const pdfParse = require("pdf-parse");
const translate = require('@iamtraction/google-translate');


module.exports = {
  // get profile, sending user, posts
  getConvert: async (req, res) => {
    console.log("navigated to convert");
    try {
      res.render("convert.ejs", { user: req.user, result: "" });
    } catch (err) {
      console.log(err);
    }
  },

  postText: async (req, res) => {
    console.log("extracting Text");
    try {
      if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
      }
      pdfParse(req.files.pdfFile).then((result) => {
        console.log(result)
        res.send(result.text)
        });
    } catch (err) {
     console.log(err)
    }
  },
  getTranslate: async (req, res) => {
    console.log("translating Text");
    console.log(req.body.translatedText)
    try {
      translate(req.body.translatedText,{to:req.body.lang}).then(function(text){
        res.send(text.text)
      });

    } catch (err) {
     console.log(err)
    }
  }
};
