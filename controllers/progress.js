const Progress = require("../models/Progress");


module.exports = {
  // get progress page, and send objs from db 
  getProgress: async (req, res) => {
    console.log('navigated to progress page')
    try {
      // set all tasks to pending
      const tasks = await Progress.find({taskStatus: "pending" });
      // Find all the completed orders
      const completeTasks = await Progress.find({taskStatus: "completed" });
      // sending the unfullfilled and fulfilled orders to the ejs to create ejs
      res.render("progress.ejs",{user:req.user, tasks: tasks, completeTasks: completeTasks});
    } catch (err) {
      console.log(err);
    }
  },
  // get specific tasks
  getTask: async (req, res) => {
    try {
      // this is the order schema for post for the order page ejs
      const tasks = await Progress.find({ clientName: req.body.clientName }).sort({createdAt: "desc"});
      
      // objs from data base, located in Order schema. rendering on order ejs
      res.render("progress.ejs", { 
        clientName: req.body.clientName,
        taskDescription: req.body.taskDescription
       });
    } catch (err) {
      console.log(err);
    }
  },
  // create Task
  createTask: async (req, res) => {
    console.log("task was created");
    try {
      await Progress.create({
        clientName: req.body.clientName,
        taskDescription: req.body.taskDescription
      });
      console.log("task has been added!");
      res.redirect('/progess');

    } catch (err) {
      console.log(err);
    }
  },
  completeTasks: async (req, res) => {
    // will go into tasks collection find an unfulfilled id that will match the id sent. 
    // this is the put method 
    try {
      await Progress.findOneAndUpdate(
        { _id: req.params.id },
        {
         taskStatus: "completed", 
        // add createdAt to DOM
        }
      );
      console.log("completed");
      res.redirect("/progress");
    } catch (err) {
      console.log(err);
    }
  },

  deleteTask: async (req, res) => {

    try {
      // find task by id, and remove
      await Progress.remove({ _id: req.params.id });
      console.log("completed");
      res.redirect("/progress");
    } catch (err) {
      console.log(err);
    }
  },
};
