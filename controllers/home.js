// get index page - homecontroller, connected to main.js
module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
};
