const Post = require("../models/Post");


module.exports = {
  // get profile, sending user, posts 
  getConvert: async (req, res) => {
    console.log('navigated to convert')
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("convert.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
