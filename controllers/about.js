const Post = require("../models/Post");


module.exports = {
  // get about page
  getAbout: async (req, res) => {
    console.log('navigated to about')
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("about.ejs", {user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
