const Post = require("../models/Post");


module.exports = {
  // get profile, sending user, posts 
  getSpaces: async (req, res) => {
    console.log('navigated to spaces')
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("spaces.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
