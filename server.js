const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const spacesRoutes = require("./routes/spaces");
const convertRoutes = require("./routes/convert");
const progressRoutes = require("./routes/progress");
const fileUpload = require("express-fileupload");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use("/", express.static("public"));
app.use(fileUpload());

//Body Parsing
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

//
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log(roomId, userId);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });
});

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/spaces", spacesRoutes);
app.use("/convert", convertRoutes);
app.use("/progress", progressRoutes);

//Server Running
server.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
