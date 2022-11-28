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
  postText: async (req, res) => {
    console.log("extracting Text");

    try {
      const formData = new FormData();
      formData.append("pdfFile", inpFile.files[0]);
      console.log(formData)
      res.render("convert.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
