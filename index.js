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

// Middlewares
app.use(cors());
app.use(express.json());


// Middlewares components
app.use(express.static("./templates/public"));

//user connected from socket.io
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("add-component", (data) => {
      io.emit("receive-component", data);
    });
  });
  
// loadinding components
app.get("/components", (_, res) => {
  res.send(loadComponentList());
});

//home 
app.get("/", (_, res) => {
  res.sendFile(resolve(__dirname, "./templates/view", "index.html"));
});

//components 
app.get("/project", (_, res) => {
  res.sendFile(resolve(__dirname, "./templates/view", "project.html"));
});

//NavBar template
app.get("/navbar", (_, res) => {
  res.sendFile(resolve(__dirname, "./templates/view/navbar", "nav.html"));
});

app.get("/navbar1", (_, res) => {
  res.sendFile(resolve(__dirname, "./templates/view/navbar", "navBar.html"));
});

//Footer template
app.get("/footer1", (_, res) => {
  res.sendFile(resolve(__dirname, "./templates/view/footer", "footer1.html"));
});

app.get("/footer", (_, res) => {
  res.sendFile(resolve(__dirname, "./templates/view/footer", "footer.html"));
});

//Article template 
app.get("/article", (_, res) => {
  res.sendFile(resolve(__dirname, "./templates/view/article", "article.html"));
});



// Routes
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/users");

// Routes middleware
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);


const { createFolder } = require("./src/utils/os");
const {exectute} = require ("./src/utils/childprocess");
const { connect } = require('http2');
const { readFolder } = require("./src/utils/readFile");

//create folder
app.post("/api/createProject", (req, res) => {
    createFolder(req.body.project)
    res.send({
        message: "Your project is created"
    })
})

 //read the folder in the project folder
 app.get("/api/readProject", (req, res) => {
 readFolder();
 
  res.send({ 
      message: "Your project is reading"
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