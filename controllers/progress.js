const Post = require("../models/Post");


module.exports = {
  // get profile, sending user, posts 
  getProgress: async (req, res) => {
    console.log('navigated to progress page')
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("progress.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
