// Core Modules
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const env = require("env-var");
const PORT = env.get("PORT").required().asInt();
const { resolve } = require("path");
const connectDB = require("./src/config/db");

const { loadComponentList } = require("./src/modules/frontend");

// Middlewares components
app.use(express.static("./templates/public"));

//user connected from socket.io
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("add-component", (data) => {
      io.emit("receive-component", data);
    });
  });
  

  

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/users");

// Routes middleware
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);


const { createFolder } = require("./src/utils/os");
const { connect } = require('http2');


app.post("/api/createProject", (req, res) => {
    createFolder(req.body.project)
    res.send({
        message: "Your project is created"
    })
})


// Server listen PORT
server.listen(PORT, () => {
    console.log("listening on *:", PORT);
    connectDB();
  });

process.on("unhandledRejection", (err, promise) => {
console.log(`Logged Error: ${err.message}`);
   server.close(() => process.exit(1));
});