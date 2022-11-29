const Post = require("../models/Post");


module.exports = {
// get profile, sending user, posts 
  getSpacesList: async (req, res) => {
    console.log('navigated to spaces list')
    try {
      res.render("spacesList.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
// space to get indiviual rooms based on list
  getSpaces: async (req, res) => {
    console.log('navigated to space')
    try {
      res.render("space.ejs", {roomId:req.params.room, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },




};


